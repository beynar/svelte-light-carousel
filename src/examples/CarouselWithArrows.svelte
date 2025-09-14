<script module>
	export const code = `
	<Carousel containerClass={'px-10'} {slides}>
		{#snippet slide({ slide })}
			<Slide {...slide} />
		{/snippet}

		{#snippet next({ next, canScrollNext, a11y })}
			<button
				class={\`btn w-fit absolute right-0 top-0 bottom-0 my-auto \${
					!canScrollNext ? 'opacity-50 cursor-not-allowed' : ''
				}\`}
				onclick={next}
				{...a11y}
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
		{/snippet}
		{#snippet prev({ prev, canScrollPrev, a11y })}
			<button
				onclick={prev}
				class={\`btn w-fit absolute left-0 top-0 bottom-0 my-auto \${
					!canScrollPrev ? 'opacity-50 !cursor-not-allowed' : ''
				}\`}
				
				{...a11y}
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
		{/snippet}
	</Carousel>
`;
</script>

<script lang="ts">
	import Carousel from '$lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel containerClass={'px-10'} {slides}>
	{#snippet slide({ slide })}
		<Slide {...slide} />
	{/snippet}

	{#snippet next({ next, canScrollNext, a11y })}
		<button
			class={`btn w-fit absolute right-0 top-0 bottom-0 my-auto ${
				!canScrollNext ? 'opacity-50 cursor-not-allowed' : ''
			}`}
			onclick={next}
			{...a11y}
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
	{/snippet}
	{#snippet prev({ prev, canScrollPrev, a11y })}
		<button
			onclick={prev}
			class={`btn w-fit absolute left-0 top-0 bottom-0 my-auto ${
				!canScrollPrev ? 'opacity-50 !cursor-not-allowed' : ''
			}`}
			
			{...a11y}
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
	{/snippet}
</Carousel>
