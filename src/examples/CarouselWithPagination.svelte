<script module>
	export const code = `
	<Carousel {slides}>
		{#snippet slide({ slide })}
			<Slide {...slide} />
		{/snippet}
		{#snippet pagination({ prev, canScrollPrev, next, canScrollNext, nextA11y, prevA11y })}
			<div
				class="w-fit absolute right-10 -bottom-10 flex gap-4"
			>
				<button
					{...prevA11y}
					class={\`btn \${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}\`}
					onclick={prev}
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
					onclick={next}
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
		{/snippet}
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '$lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel {slides}>
	{#snippet slide({ slide })}
		<Slide {...slide} />
	{/snippet}
	{#snippet pagination({ prev, canScrollPrev, next, canScrollNext, nextA11y, prevA11y })}
		<div
			class="w-fit absolute right-10 -bottom-10 flex gap-4"
		>
			<button
				{...prevA11y}
				class={`btn ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
				onclick={prev}
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
				onclick={next}
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
	{/snippet}
</Carousel>
