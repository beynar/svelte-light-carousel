<script context="module">
	export const code = `
	<Carousel {slides}>
		<Slide slot="slide" let:slide {...slide} />
		<div
			slot="pagination"
			class="w-fit absolute right-10 -bottom-10 flex gap-4"
			let:prev
			let:canScrollPrev
			let:next
			let:canScrollNext
			let:nextA11y
			let:prevA11y
		>
			<button
				{...prevA11y}
				class={\`btn \${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}\`}
				on:click={prev}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
			</button>
			<button
				{...nextA11y}
				class={\`btn \${!canScrollNext ? 'opacity-50 !cursor-not-allowed' : ''}\`}
				on:click={next}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</button>
		</div>
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '$lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel {slides}>
	<Slide slot="slide" let:slide {...slide} />
	<div
		slot="pagination"
		class="w-fit absolute right-10 -bottom-10 flex gap-4"
		let:prev
		let:canScrollPrev
		let:next
		let:canScrollNext
		let:nextA11y
		let:prevA11y
	>
		<button
			{...prevA11y}
			class={`btn ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
			on:click={prev}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
			</svg>
		</button>
		<button
			{...nextA11y}
			class={`btn ${!canScrollNext ? 'opacity-50 !cursor-not-allowed' : ''}`}
			on:click={next}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</button>
	</div>
</Carousel>
