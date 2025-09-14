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
export type DotA11y = {
	'aria-controls': string;
	'aria-label': string;
	role: 'tab';
	id: string;
	'aria-selected': boolean;
	tabIndex?: number;
};
export type Dot = { active: boolean; a11y: DotA11y };
interface DragScrollParameters {
	enabled?: boolean;
	oneAtTime?: boolean;
	pauseOnHover?: boolean;
	dragFree?: boolean;
	autoPlay?: number;
	axis?: { [S in Sizes]?: 'x' | 'y' };
	layout: { [S in Sizes]?: number };
	onInit: (event: OnInitEvent) => void;
	partialDelta?: { [S in Sizes]?: number };
	autoHeight?: boolean;
	id: string;
	onChange: (event: OnChangeEvent) => void;
}

export type OnInitEvent = {
	navigate: (slide: number) => void;
	scrollTo: (slide: number) => void;
};
export type OnChangeEvent = {
	currentSlide: number;
	progress: number;
	slidesInView: number[];
	dots: Dot[];
	canScrollNext: boolean;
	canScrollPrev: boolean;
};

export const dragScroll = (
	node: HTMLElement,
	{
		id,
		oneAtTime = false,
		layout,
		axis = { default: 'x' },
		enabled = true,
		partialDelta,
		dragFree,
		pauseOnHover,
		autoHeight,
		autoPlay,
		onInit,
		onChange
	}: DragScrollParameters
) => {
	const getCurrentSlide = () => {
		if (currentAxis === 'x') {
			if (node.scrollLeft < slideWidth / 2) {
				return 0;
			}
			if (node.scrollLeft > node.scrollWidth - node.clientWidth - slideWidth / 2) {
				return slideCount - slidesPerView;
			}
			return Math.ceil((node.scrollLeft - slideWidth / 3) / slideWidth);
		} else {
			return Math.floor(node.scrollTop / slideHeight);
		}
	};

	const emitChange = () => {
		currentSlide = getCurrentSlide();
		onChange({
			canScrollNext: currentSlide < slideCount - 1,
			canScrollPrev: currentSlide > 0,
			currentSlide,
			progress: (node.scrollLeft / (node.scrollWidth - node.clientWidth)) * 100,
			dots: Array.from({ length: slideCount - (slidesPerView - 1) }, (_, index) => ({
				active: index === currentSlide,
				a11y: {
					'aria-controls': `${id}-slide-${index + 1}`,
					'aria-label': `Slide ${index + 1}`,
					'aria-selected': index === currentSlide,
					id: `${id}-tab-${index + 1}`,
					role: 'tab',
					tabIndex: index === currentSlide ? undefined : -1
				}
			})),
			slidesInView: Array.from({ length: slideCount }, (_, i) => i).filter(
				(slide) => slide >= currentSlide && slide < currentSlide + slidesPerView
			)
		});
		if (mouseTargetedSlide) {
			mouseTargetedSlide.style.pointerEvents = 'auto';
		}
		if (!autoPlayPaused) {
			startPlay();
		}
	};
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
	let currentAxis: 'x' | 'y' = axis?.[getSize()] ?? axis?.['default'] ?? 'x';
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
	let mouseTargetedSlide: HTMLElement | undefined;
	let autoPlayTimeout: number;
	let autoPlayPaused: boolean;

	const startPlay = () => {
		if (autoPlay) {
			if (autoPlayTimeout) {
				clearInterval(autoPlayTimeout);
			}
			autoPlayTimeout = setInterval(() => {
				if (currentSlide + slidesPerView - 1 < slideCount - 1) {
					navigate(currentSlide + 1);
				} else {
					navigate(0);
				}
			}, autoPlay * 1000);
		}
	};

	const pauseAutoPlay = () => {
		if (autoPlayTimeout) {
			autoPlayPaused = true;
			clearInterval(autoPlayTimeout);
		}
	};
	const resumePlay = () => {
		if (autoPlayPaused) {
			autoPlayPaused = false;
			startPlay();
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
		startScroll = currentAxis === 'x' ? node.scrollLeft : node.scrollTop;

		window.addEventListener('mouseup', handleMouseUpAndLeave);
		window.addEventListener('mousemove', handleMouseMove);
	};

	const handleMouseMove = (e: PointerEvent | MouseEvent) => {
		if (isDown) {
			e.preventDefault();
			if (currentAxis === 'x') {
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
	const navigate = (slide: number) => {
		if (currentAxis === 'x') {
			const targetLeft = slide * slideWidth;
			node.scrollLeft = targetLeft;
		} else {
			const targetTop = slide * slideHeight + slide;
			node.scrollTop = targetTop;
		}
	};
	const scrollTo = (slide: number) => {
		if (currentAxis === 'x') {
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
					// emitChange(slide);
				} else if (targetLeft > node.scrollWidth - node.clientWidth) {
					animation(node.scrollLeft, node.scrollWidth);
					// emitChange(slide);
				} else {
					animation(node.scrollLeft, targetLeft);
					// emitChange(slide);
				}
			} else {
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

		if (currentAxis === 'x') {
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
			}
		}
		isDown = false;
		window.removeEventListener('mouseup', handleMouseUpAndLeave);
		window.removeEventListener('mousemove', handleMouseMove);
	};

	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3.5);
	}

	const animation = (start: number, target: number, duration = 1) => {
		const lerp = (start: number, end: number, time: number, r = easeOutCubic(time)) =>
			start * (1 - r) + end * r;

		const frames = duration * 60; // number of frames during duration (at 60 fps)
		let time = 0;
		const step = 1 / frames;
		const animateScroll = () => {
			if (currentAxis === 'x') {
				node.scrollLeft = lerp(start, target, time);
			} else {
				node.scrollTop = lerp(start, target, time);
			}
			time += step;
			if (time < 1) {
				requestAnimationFrame(animateScroll);
			} else {
				if (currentAxis === 'x') {
					node.scrollLeft = target;
				} else {
					node.scrollTop = target;
				}
				node.setAttribute('data-dragging', 'false');

				setTimeout(() => {
					ongoingAnimation = false;
				}, 110);

				emitChange();
			}
		};
		requestAnimationFrame(animateScroll);
	};

	const init = () => {
		slideCount = node.childElementCount;
		if (autoHeight) {
			node.style.transform = 'unset';
		}
		slideWidth = (node.firstChild as HTMLElement)?.clientWidth;
		slideHeight = (node.firstChild as HTMLElement)?.clientHeight;
		slidesPerView = layout?.[getSize()] ?? layout?.['default'] ?? 1;
		currentAxis = axis?.[getSize()] ?? axis?.['default'] ?? 'x';
		if (autoHeight && currentAxis === 'y') {
			const delta = partialDelta?.[getSize()] ?? partialDelta?.['default'] ?? 0;
			node.style.height = slideHeight * slidesPerView + delta + 'px';
		}
		onInit({
			navigate,
			scrollTo
		});
		emitChange();
	};
	window.addEventListener('resize', () => {
		init();
		if (currentAxis === 'x') {
			node.scrollLeft = currentSlide * slideWidth + currentSlide;
		} else {
			node.scrollTop = currentSlide * slideHeight + currentSlide;
		}
	});

	const onScroll = () => {
		if (!isDown && !ongoingAnimation) {
			emitChange();
		}
	};
	const addEvents = ({ autoPlay, pauseOnHover }: { autoPlay?: number; pauseOnHover?: boolean }) => {
		if (!isMobile) {
			node.addEventListener('mousedown', handleMouseDown);
		}
		if (autoPlay && pauseOnHover) {
			node.addEventListener('pointerenter', pauseAutoPlay);
			node.addEventListener('pointerleave', resumePlay);
		}
		node.addEventListener('scroll', onScroll);
	};

	const removeEvents = () => node.removeEventListener('mousedown', handleMouseDown);

	init();
	enabled && addEvents({ autoPlay, pauseOnHover });
	return {
		update(update: Partial<DragScrollParameters> = {}) {
			removeEvents();
			if (update.enabled)
				addEvents({
					autoPlay: update.autoPlay,
					pauseOnHover: update.pauseOnHover
				});
			else removeEvents();
			init();
			if (autoPlayTimeout && !autoPlay) {
				clearInterval(autoPlayTimeout);
			}
		},
		destroy: removeEvents
	};
};
