const getSize = () => {
	const width = window.innerWidth;
	if (width < 640) return 'xs';
	if (width < 768) return 'sm';
	if (width < 1024) return 'md';
	if (width < 1280) return 'lg';
	return 'xl';
};
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default';
export type ResponsiveProperty<T = number> = Partial<Record<Sizes, T>>;

interface DragScrollParameters {
	enabled?: boolean;
	oneAtTime?: boolean;
	dragFree?: boolean;

	autoPlay?: number;
	axis?: 'x' | 'y';
	layout: { [S in Sizes]?: number };
	onInit: (event: OnInitEvent) => void;
	partialDelta?: { [S in Sizes]?: number };
	autoHeight?: boolean;
	onChange: (event: OnChangeEvent) => void;
}

export type OnInitEvent = {
	slidesPerView: number;
	scrollWidth: number;

	scrollTo: (slide: number) => void;
};
export type OnChangeEvent = {
	currentSlide: number;
	progress: number;
	slidesInView: number[];
	dots: boolean[];
	canScrollNext: boolean;
	canScrollPrev: boolean;
};

export const dragScroll = (
	node: HTMLElement,
	{
		oneAtTime = false,
		layout,
		axis = 'x',
		enabled = true,
		partialDelta,
		dragFree,
		autoHeight,
		autoPlay,
		onInit,
		onChange
	}: DragScrollParameters
) => {
	const getCurrentSlide = () => {
		if (axis === 'x') {
			if (node.scrollLeft < slideWidth / 2) {
				return 0;
			}
			if (node.scrollLeft > node.scrollWidth - node.clientWidth - slideWidth / 2) {
				return slideCount - slidesPerView;
			}

			return Math.floor(node.scrollLeft / slideWidth);
		} else {
			return Math.floor(node.scrollTop / slideHeight);
		}
	};

	const emitChange = () => {
		onChange({
			canScrollNext: currentSlide < slideCount - 1,
			canScrollPrev: currentSlide > 0,
			currentSlide,
			progress: (node.scrollLeft / (node.scrollWidth - node.clientWidth)) * 100,
			dots: Array.from({ length: slideCount - (slidesPerView - 1) }, (_, i) => i === currentSlide),
			slidesInView: Array.from({ length: slideCount }, (_, i) => i).filter(
				(slide) => slide >= currentSlide && slide < currentSlide + slidesPerView
			)
		});
		if (mouseTargetedSlide) {
			mouseTargetedSlide.style.pointerEvents = 'auto';
		}
	};
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
	let isDown = false;
	let startTime: number;
	let startScroll: number;
	let startX: number;
	let startY: number;
	let currentX: number;
	let currentY: number;
	let slideCount: number;
	let slidesPerView: number;
	let ongoingAnimation = false;
	let slideWidth = (node.firstChild as HTMLElement)?.clientWidth;
	let slideHeight = (node.firstChild as HTMLElement)?.clientHeight;
	let currentSlide: number = getCurrentSlide();
	let autoPlayTimeout: number;
	let mouseTargetedSlide: HTMLElement | undefined;

	const startPlay = () => {
		if (autoPlay) {
			if (autoPlayTimeout) {
				clearInterval(autoPlayTimeout);
			}
			autoPlayTimeout = setInterval(() => {
				if (currentSlide + slidesPerView - 1 < slideCount - 1) {
					scrollTo(currentSlide + 1);
				} else {
					scrollTo(0);
				}
			}, autoPlay * 1000);
		}
	};

	const handleMouseDown = (e: PointerEvent | MouseEvent) => {
		isDown = true;
		node.setAttribute('data-dragging', 'true');
		startTime = Date.now();
		mouseTargetedSlide = e.composedPath().find((el) => {
			return !!(el as HTMLElement).dataset?.['carouselSlide'];
		}) as HTMLElement | undefined;

		startX = e.pageX - node.offsetLeft;
		startY = e.pageY - node.offsetTop;
		startScroll = axis === 'x' ? node.scrollLeft : node.scrollTop;

		window.addEventListener('mouseup', handleMouseUpAndLeave);
		window.addEventListener('mousemove', handleMouseMove);
	};

	const handleMouseMove = (e: PointerEvent | MouseEvent) => {
		if (isDown) {
			e.preventDefault();
			if (axis === 'x') {
				currentX = e.pageX - node.offsetLeft;
				node.scrollLeft = startScroll - (currentX - startX);
			} else {
				currentY = e.pageY - node.offsetTop;
				node.scrollTop = startScroll - (currentY - startY);
			}

			if (mouseTargetedSlide) {
				const distanceX = Math.abs(currentX - startX);
				const distanceY = Math.abs(currentY - startY);
				if (distanceX > 10 || distanceY > 10) {
					mouseTargetedSlide.style.pointerEvents = 'none';
				}
			}
		}
	};

	const scrollTo = (slide: number) => {
		if (axis === 'x') {
			let targetLeft = slide * slideWidth;

			if (targetLeft > node.scrollWidth - node.clientWidth) {
				targetLeft = node.scrollWidth - node.clientWidth;
			}

			if (targetLeft < 0) {
				targetLeft = 0;
			}
			if (!ongoingAnimation) {
				ongoingAnimation = true;
				if (targetLeft < slideWidth / 2) {
					animation(node.scrollLeft, 0);
				} else if (targetLeft > node.scrollWidth - node.clientWidth) {
					animation(node.scrollLeft, node.scrollWidth);
				} else {
					animation(node.scrollLeft, targetLeft);
				}
			} else {
				currentSlide = getCurrentSlide();
				emitChange();
			}
		} else {
			let targetTop = slide * slideHeight + slide;

			if (targetTop > node.scrollHeight - node.clientHeight) {
				targetTop = node.scrollHeight - node.clientHeight;
			}

			if (targetTop < 0) {
				targetTop = 0;
			}
			if (!ongoingAnimation) {
				ongoingAnimation = true;
				if (targetTop < slideHeight / 2) {
					animation(node.scrollTop, 0);
				} else if (targetTop > node.scrollHeight - node.clientHeight) {
					animation(node.scrollTop, node.scrollHeight);
				} else {
					animation(node.scrollTop, targetTop);
				}
			} else {
				currentSlide = getCurrentSlide();
				emitChange();
			}
		}
	};

	const handleMouseUpAndLeave = (e: MouseEvent) => {
		const endTime = Date.now();
		currentX = e.pageX - node.offsetLeft;
		currentY = e.pageY - node.offsetTop;
		const time = endTime - startTime;
		const distanceX = Math.abs(currentX - startX);
		const distanceY = Math.abs(currentY - startY);

		if (axis === 'x') {
			if (distanceX > 10 && distanceX > distanceY) {
				const speedX = distanceX / time;
				const direction = startX > currentX ? 1 : -1;
				const multiplier = Math.ceil(Math.min(Math.max(Math.pow(speedX, 0.5), 0), 3));
				const computedDistance =
					(distanceX * multiplier) / (dragFree ? 1 : slideWidth - slideWidth / 4);

				let deltaSlide =
					direction === -1 ? Math.ceil(computedDistance) : Math.round(computedDistance);

				if (oneAtTime && deltaSlide > 1) {
					deltaSlide = 1;
				}

				if (!dragFree) {
					scrollTo(currentSlide + deltaSlide * direction);
				} else {
					animation(node.scrollLeft, node.scrollLeft + computedDistance * direction);
				}

				startPlay();
			}
		} else {
			if (distanceY > 10 && distanceY > distanceX) {
				const speedY = distanceY / time;
				const direction = startY > currentY ? 1 : -1;
				const multiplier = Math.ceil(Math.min(Math.max(Math.pow(speedY, 0.5), 0), 3));
				const computedDistance = (distanceY * multiplier) / (dragFree ? 1 : slideHeight);

				let deltaSlide =
					direction === -1 ? Math.ceil(computedDistance) : Math.round(computedDistance);

				if (oneAtTime && deltaSlide > 1) {
					deltaSlide = 1;
				}

				if (!dragFree) {
					scrollTo(currentSlide + deltaSlide * direction);
				} else {
					animation(node.scrollTop, node.scrollTop + computedDistance * direction);
				}
				startPlay();
			}
		}
		isDown = false;
		window.removeEventListener('mouseup', handleMouseUpAndLeave);
		window.removeEventListener('mousemove', handleMouseMove);
	};

	const easeInOutCubic = (t: number) =>
		t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	const animation = (start: number, target: number) => {
		const lerp = (start: number, end: number, time: number, r = easeInOutCubic(time)) =>
			start * (1 - r) + end * r;
		let time = 0;
		const animateScroll = () => {
			if (axis === 'x') {
				node.scrollLeft = lerp(start, target, time);
			} else {
				node.scrollTop = lerp(start, target, time);
			}
			time += 0.06;
			if (time < 1) {
				requestAnimationFrame(animateScroll);
			} else {
				if (axis === 'x') {
					node.scrollLeft = target;
				} else {
					node.scrollTop = target;
				}
				node.setAttribute('data-dragging', 'false');

				setTimeout(() => {
					ongoingAnimation = false;
				}, 110);

				currentSlide = getCurrentSlide();

				emitChange();
			}
		};
		requestAnimationFrame(animateScroll);
	};

	const init = () => {
		node.setAttribute('data-is-mobile', (!dragFree && isMobile).toString());
		slideCount = node.childElementCount;
		if (autoHeight) {
			node.style.transform = 'unset';
		}
		slideWidth = (node.firstChild as HTMLElement)?.clientWidth;
		slideHeight = (node.firstChild as HTMLElement)?.clientHeight;
		slidesPerView = layout?.[getSize()] ?? layout?.['default'] ?? 1;
		if (autoHeight && axis === 'y') {
			const delta = partialDelta?.[getSize()] ?? partialDelta?.['default'] ?? 0;
			node.style.height = slideHeight * slidesPerView + delta + 'px';
		}
		onInit({
			scrollWidth: node.scrollWidth,
			slidesPerView,
			scrollTo
		});
		emitChange();
		startPlay();
	};
	window.addEventListener('resize', () => {
		init();
		if (axis === 'x') {
			node.scrollLeft = currentSlide * slideWidth + currentSlide;
		} else {
			node.scrollTop = currentSlide * slideHeight + currentSlide;
		}
	});

	const debouncedScroll = () => {
		console.log('debouncedScroll');
		currentSlide = getCurrentSlide();
		emitChange();
		startPlay();
	};

	const onScroll = (e: Event) => {
		e.stopPropagation();
		if (!isDown && !ongoingAnimation) {
			debouncedScroll();
		}
	};
	const addEvents = () => {
		if (!isMobile) {
			node.addEventListener('mousedown', handleMouseDown);
		}
		node.addEventListener('scroll', onScroll);
	};

	enabled && addEvents();

	const removeEvents = () => node.removeEventListener('mousedown', handleMouseDown);

	init();

	return {
		update(update: Partial<DragScrollParameters> = {}) {
			removeEvents();
			if (update.enabled) addEvents();
			else removeEvents();
			init();
			if (autoPlayTimeout && !autoPlay) {
				clearInterval(autoPlayTimeout);
			}
		},
		destroy: removeEvents
	};
};
