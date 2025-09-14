<script module>
	export const code = `
	<Carousel class="px-0 py-4" {slides} layout={{ default: 1 }} gaps={{ default: 20 }}>
		{#snippet slide({ slide })}
			<Slide {...slide} />
		{/snippet}
		{#snippet dots({ dots, a11y, scrollTo })}
			<div
				data-progress
				class="absolute left-1/4 -bottom-10 w-1/2 gap-2 justify-center flex items-center z-10"
				{...a11y}
			>
				{#each dots as { a11y }, i}
					<button
						{...a11y}
						onclick={() => scrollTo(i)}
						class={'rounded-full cursor-pointer aria-[selected="true"]:scale-125 transition-all w-4 h-4  aria-[selected="true"]:bg-slate-100 bg-slate-500'}
					></button>
				{/each}
			</div>
		{/snippet}
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '../lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel class="px-0 py-4" {slides} layout={{ default: 1 }} gaps={{ default: 20 }}>
	{#snippet slide({ slide })}
		<Slide {...slide} />
	{/snippet}
	{#snippet dots({ dots, a11y, scrollTo })}
		<div
			data-progress
			class="absolute left-1/4 -bottom-10 w-1/2 gap-2 justify-center flex items-center z-10"
			{...a11y}
		>
			{#each dots as { a11y }, i}
				<button
					{...a11y}
					onclick={() => scrollTo(i)}
					class={'rounded-full cursor-pointer aria-[selected="true"]:scale-125 transition-all w-4 h-4  aria-[selected="true"]:bg-slate-100 bg-slate-500'}
				></button>
			{/each}
		</div>
	{/snippet}
</Carousel>
