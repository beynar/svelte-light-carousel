<script lang="ts">
	type Slide = $$Generic;
	type ButtonsA11y = {
		a11y: {
			'aria-controls': string;
			'aria-label': string;
		};
	};
	type DotsA11y = {
		role: string;
		'aria-label': string;
	};
	type $$Slots = {
		slide: {
			slide: Slide;
			inView: boolean;
			index: number;
		};
		pagination: {
			canScrollPrev: boolean;
			prev: typeof prev;
			canScrollNext: boolean;
			next: typeof next;
			nextA11y: ButtonsA11y['a11y'];
			prevA11y: ButtonsA11y['a11y'];
		};
		prev: {
			canScrollPrev: boolean;
			prev: typeof prev;
		} & ButtonsA11y;
		next: {
			canScrollNext: boolean;
			next: typeof next;
		} & ButtonsA11y;
		progress: {
			progress: number;
			scrollTo: typeof scrollProgress;
		};
		dots: {
			dots: Dot[];
			a11y: DotsA11y;
			scrollTo: typeof scrollDot;
		};
	};

	import {
		dragScroll,
		type DotA11y,
		type OnChangeEvent,
		type OnInitEvent,
		type ResponsiveProperty,
		type Dot
	} from './carousel.js';

	export let id = 'carousel' + Math.random().toString(36).substring(2, 9);
	export let slides: Slide[] = [];
	export let withGrabCursor: boolean = true;
	export let key: keyof Slide | undefined = undefined;
	export let axis: ResponsiveProperty<'x' | 'y'> = { default: 'x' };
	export let dragFree: boolean = false;
	export let disableNativeScroll: ResponsiveProperty<boolean> = {
		default: false
	};
	export let oneAtTime: boolean = false;
	export let autoHeight: boolean = true;
	export let autoPlay: number = 0;
	export let pauseOnHover: boolean = false;
	export let layout: ResponsiveProperty = {
		default: 1
	};
	export let gap: ResponsiveProperty = {
		default: 20
	};
	export let partialDelta: ResponsiveProperty = {
		default: 0
	};
	export let containerClass: string = '';
	export let slideClass: string = '';

	let slidesInView: number[] = [];
	let dots: Dot[] = [];
	let canScrollNext = false;
	let canScrollPrev = false;
	let progress: number = 0;
	let currentSlide: number = 0;
	let mounted: boolean = false;

	let scrollTo: (slide: number) => void;
	let navigate: (slide: number) => void;

	const next = () => canScrollNext && navigate(currentSlide + 1);
	const prev = () => canScrollPrev && navigate(currentSlide - 1);

	const onInit = (event: OnInitEvent) => {
		scrollTo = event.scrollTo;
		navigate = event.navigate;
		mounted = true;
	};

	const onChange = (event: OnChangeEvent) => {
		progress = event.progress;
		slidesInView = event.slidesInView;
		dots = event.dots;
		canScrollNext = event.canScrollNext;
		canScrollPrev = event.canScrollPrev;
		currentSlide = event.currentSlide;
	};

	const scrollProgress = (e: PointerEvent) => {
		const track = e.currentTarget;
		if (track instanceof HTMLElement) {
			const pointerPositionOnTrackInPercent =
				(e.clientX - track.getBoundingClientRect().left) / track.clientWidth;
			navigate(Math.floor(pointerPositionOnTrackInPercent * slides.length));
		}
	};
	const scrollDot = (dot: number) => navigate(dot);

	const buttonA11y = (type: 'prev' | 'next') => ({
		'aria-controls': `${id}-slides`,
		'aria-label': type === 'prev' ? 'Previous slide' : 'Next slide'
	});
</script>

{#if slides.length > 0}
	<div aria-roledescription="carousel" {id} class={containerClass} data-carousel-container>
		<div
			class={$$props.class}
			data-carousel-slider
			data-carousel-with-grab-cursor={withGrabCursor}
			data-dragging="false"
			data-drag-free={dragFree}
			use:dragScroll={{
				layout,
				id,
				autoHeight,
				pauseOnHover,
				partialDelta,
				onInit,
				onChange,
				dragFree,
				oneAtTime,
				autoPlay,
				axis
			}}
			style:--padding-xs={`${(axis.xs || axis.default) === 'x' ? '0 ' : ''}${
				gap.xs ?? gap.default ?? 20
			}px ${(axis.xs || axis.default) === 'x' ? '' : '0'}`}
			style:--padding-sm={`${(axis.sm || axis.default) === 'x' ? '0 ' : ''}${
				gap.sm ?? gap.default ?? 20
			}px ${(axis.sm || axis.default) === 'x' ? '' : '0'}`}
			style:--padding-md={`${(axis.md || axis.default) === 'x' ? '0 ' : ''}${
				gap.md ?? gap.default ?? 20
			}px ${(axis.md || axis.default) === 'x' ? '' : '0'}`}
			style:--padding-lg={`${(axis.lg || axis.default) === 'x' ? '0 ' : ''}${
				gap.lg ?? gap.default ?? 20
			}px ${(axis.lg || axis.default) === 'x' ? '' : '0'}`}
			style:--padding-xl={`${(axis.xl || axis.default) === 'x' ? '0 ' : ''}${
				gap.xl ?? gap.default ?? 20
			}px ${(axis.xl || axis.default) === 'x' ? '' : '0'}`}
			style:--overflow-xs={axis.xs === 'x'
				? `${disableNativeScroll.xs ?? disableNativeScroll.default ? 'hidden' : 'auto'} visible`
				: `visible ${disableNativeScroll.xs ?? disableNativeScroll.default ? 'hidden' : 'auto'}`}
			style:--overflow-sm={axis.sm === 'x'
				? `${disableNativeScroll.sm ?? disableNativeScroll.default ? 'hidden' : 'auto'} visible`
				: `visible ${disableNativeScroll.sm ?? disableNativeScroll.default ? 'hidden' : 'auto'}`}
			style:--overflow-md={axis.md === 'x'
				? `${disableNativeScroll.md ?? disableNativeScroll.default ? 'hidden' : 'auto'} visible`
				: `visible ${disableNativeScroll.md ?? disableNativeScroll.default ? 'hidden' : 'auto'}`}
			style:--overflow-lg={axis.lg === 'x'
				? `${disableNativeScroll.lg ?? disableNativeScroll.default ? 'hidden' : 'auto'} visible`
				: `visible ${disableNativeScroll.lg ?? disableNativeScroll.default ? 'hidden' : 'auto'}`}
			style:--overflow-xl={axis.xl === 'x'
				? `${disableNativeScroll.xl ?? disableNativeScroll.default ? 'hidden' : 'auto'} visible`
				: `visible ${disableNativeScroll.xl ?? disableNativeScroll.default ? 'hidden' : 'auto'}`}
			style:--layout-xs={`${100 / (layout.xs ?? layout.default ?? 1)}%`}
			style:--layout-sm={`${100 / (layout.sm ?? layout.default ?? 2)}%`}
			style:--layout-md={`${100 / (layout.md ?? layout.default ?? 2)}%`}
			style:--layout-lg={`${100 / (layout.lg ?? layout.default ?? 3)}%`}
			style:--layout-xl={`${100 / (layout.xl ?? layout.default ?? 4)}%`}
			style:--partial-delta-xs={`${partialDelta.xs ?? partialDelta.default ?? 0}px`}
			style:--partial-delta-sm={`${partialDelta.sm ?? partialDelta.default ?? 0}px`}
			style:--partial-delta-md={`${partialDelta.md ?? partialDelta.default ?? 0}px`}
			style:--partial-delta-lg={`${partialDelta.lg ?? partialDelta.default ?? 0}px`}
			style:--partial-delta-xl={`${partialDelta.xl ?? partialDelta.default ?? 0}px`}
			data-axis-xs={axis.xs || axis.default || 'x'}
			data-axis-sm={axis.sm || axis.default || 'x'}
			data-axis-md={axis.md || axis.default || 'x'}
			data-axis-lg={axis.lg || axis.default || 'x'}
			data-axis-xl={axis.xl || axis.default || 'x'}
			style:transform={autoHeight ? 'scaleY(0%)' : ''}
			id={`${id}-slides`}
		>
			<!-- style:--flex-direction={axis === 'x' ? 'row' : 'column'}
			style:--display={axis === 'x' ? 'flex' : 'grid'}
			style:--snap-type={axis === 'x' ? 'x mandatory' : 'y mandatory'} -->
			{#each slides as slide, index (key ? slide[key] : index)}
				<div
					id={`${id}-slide-${index + 1}`}
					aria-label={`Slide ${index + 1} of ${slides.length} `}
					aria-roledescription="slide"
					role="tabpanel"
					class={slideClass}
					data-carousel-slide={index}
				>
					<slot name="slide" inView={slidesInView.includes(index)} {index} {slide} />
				</div>
			{/each}
		</div>

		<slot name="progress" scrollTo={scrollProgress} {progress} />
		<slot
			name="dots"
			a11y={{
				'aria-label': 'Slides',
				role: 'tablist'
			}}
			scrollTo={scrollDot}
			{dots}
		/>
		<slot
			name="pagination"
			{next}
			{canScrollNext}
			{prev}
			{canScrollPrev}
			nextA11y={buttonA11y('next')}
			prevA11y={buttonA11y('prev')}
		/>
		<slot name="next" {next} {canScrollNext} a11y={buttonA11y('next')} />
		<slot name="prev" {prev} {canScrollPrev} a11y={buttonA11y('prev')} />
	</div>
{/if}

<style>
	[data-carousel-container] {
		position: relative;
		overflow: visible;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		min-width: 100%;
	}

	[data-carousel-slider] {
		display: flex;
		flex-direction: row;
		user-select: none;
		position: relative;
		flex-wrap: nowrap;
		max-height: 100%;
		max-width: 100%;
	}
	:global([data-carousel-slider][data-dragging='false'][data-drag-free='false']) {
		scroll-snap-type: x mandatory;
	}
	[data-carousel-with-grab-cursor='true'] {
		cursor: grab;
	}
	[data-carousel-with-grab-cursor='true']:active {
		cursor: grabbing;
	}
	[data-carousel-slide] {
		height: auto;
	}

	@media (max-width: 640px) {
		[data-carousel-slider] {
			overflow: var(--overflow-xs);
		}
		[data-carousel-slider] > [data-carousel-slide] {
			flex: 0 0 calc(var(--layout-xs) - var(--partial-delta-xs));
			padding: var(--padding-xs);
		}
		:global([data-carousel-slider][data-axis-xs='y']) {
			flex-direction: column !important;
		}
		:global(
				[data-carousel-slider][data-axis-xs='y'][data-dragging='false'][data-drag-free='false']
			) {
			scroll-snap-type: y mandatory;
		}
	}
	@media (min-width: 640px) {
		[data-carousel-slider] {
			overflow: var(--overflow-sm);
		}
		[data-carousel-slider] > [data-carousel-slide] {
			flex: 0 0 calc(var(--layout-sm) - var(--partial-delta-sm));
			padding: var(--padding-sm);
		}
		:global([data-carousel-slider][data-axis-sm='y']) {
			flex-direction: column !important;
		}
		:global(
				[data-carousel-slider][data-axis-sm='y'][data-dragging='false'][data-drag-free='false']
			) {
			scroll-snap-type: y mandatory;
		}
	}
	@media (min-width: 768px) {
		[data-carousel-slider] {
			overflow: var(--overflow-md);
		}
		[data-carousel-slider] > [data-carousel-slide] {
			flex: 0 0 calc(var(--layout-md) - var(--partial-delta-md));
			padding: var(--padding-md);
		}
		:global([data-carousel-slider][data-axis-md='y']) {
			flex-direction: column !important;
		}
		:global(
				[data-carousel-slider][data-axis-md='y'][data-dragging='false'][data-drag-free='false']
			) {
			scroll-snap-type: y mandatory;
		}
	}

	@media (min-width: 1024px) {
		[data-carousel-slider] {
			overflow: var(--overflow-lg);
		}
		[data-carousel-slider] > [data-carousel-slide] {
			flex: 0 0 calc(var(--layout-lg) - var(--partial-delta-lg));
			padding: var(--padding-lg);
		}
		:global([data-carousel-slider][data-axis-lg='y']) {
			flex-direction: column !important;
		}
		:global(
				[data-carousel-slider][data-axis-lg='y'][data-dragging='false'][data-drag-free='false']
			) {
			scroll-snap-type: y mandatory;
		}
	}
	@media (min-width: 1280px) {
		[data-carousel-slider] {
			overflow: var(--overflow-xl);
		}
		[data-carousel-slider] > [data-carousel-slide] {
			flex: 0 0 calc(var(--layout-xl) - var(--partial-delta-xl));
			padding: var(--padding-xl);
		}
		:global([data-carousel-slider][data-axis-xl='y']) {
			flex-direction: column !important;
		}
		:global(
				[data-carousel-slider][data-axis-xl='y'][data-dragging='false'][data-drag-free='false']
			) {
			scroll-snap-type: y mandatory;
		}
	}

	:global([data-carousel-slider] img) {
		user-select: none;
	}

	[data-carousel-slider]::-webkit-scrollbar {
		display: none;
	}
	[data-carousel-slider] {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	:global([data-carousel-slider][data-dragging='false'][data-drag-free='false']) {
		scroll-snap-type: mandatory;
		scroll-behavior: smooth;
	}
	:global(
			[data-carousel-slider][data-dragging='false'][data-drag-free='false'] > [data-carousel-slide]
		) {
		scroll-snap-align: start;
	}
</style>
