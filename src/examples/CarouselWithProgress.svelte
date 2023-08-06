<script context="module">
	export const code = `
	<Carousel {slides}>
		<Slide slot="slide" let:slide {...slide} />
		<div
			slot="progress"
			let:progress
			let:scrollTo
			data-progress
			on:pointerdown={scrollTo}
			class="absolute left-1/4 -bottom-5 w-1/2 overflow-hidden cursor-pointer  h-2  justify-center flex items-center z-10 bg-slate-200 rounded-sm"
		>
			<div
				style:transform={\`scaleX(\${progress}%)\`}
				class="w-full h-full pointer-events-none transition-all origin-left bg-primary-focus"
			/>
		</div>
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '../lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel {slides}>
	<Slide slot="slide" let:slide {...slide} />

	<div
		slot="progress"
		let:progress
		let:scrollTo
		data-progress
		on:pointerdown={scrollTo}
		class="absolute left-1/4 -bottom-5 w-1/2 overflow-hidden cursor-pointer h-2 justify-center flex items-center z-10 rounded-sm bg-slate-500"
	>
		<div
			style:transform={`scaleX(${progress}%)`}
			class="w-full h-full pointer-events-none transition-all ease-linear origin-left bg-slate-200"
		/>
	</div>
</Carousel>
