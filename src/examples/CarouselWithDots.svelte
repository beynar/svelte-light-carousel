<script context="module">
	export const code = `
	<Carousel class="px-0 py-4" {slides} layout={{ default: 1 }} gaps={{ default: 20 }}>
		<Slide slot="slide" let:slide {...slide} />
		<div
			slot="dots"
			let:dots
			let:scrollTo
			data-progress
			class="absolute left-1/4 -bottom-10 w-1/2 gap-2 justify-center flex items-center z-10"
		>
			{#each dots as { a11y }, i}
				<button
					{...a11y}
					on:click={() => scrollTo(i)}
					class={'rounded-full cursor-pointer aria-[selected="true"]:scale-125 transition-all w-4 h-4  aria-[selected="true"]:bg-slate-100 bg-slate-500'}
				/>
			{/each}
		</div>
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '../lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel class="px-0 py-4" {slides} layout={{ default: 1 }} gaps={{ default: 20 }}>
	<Slide slot="slide" let:slide {...slide} />
	<div
		slot="dots"
		let:dots
		let:scrollTo
		data-progress
		class="absolute left-1/4 -bottom-10 w-1/2 gap-2 justify-center flex items-center z-10"
	>
		{#each dots as { a11y }, i}
			<button
				{...a11y}
				on:click={() => scrollTo(i)}
				class={'rounded-full cursor-pointer aria-[selected="true"]:scale-125 transition-all w-4 h-4  aria-[selected="true"]:bg-slate-100 bg-slate-500'}
			/>
		{/each}
	</div>
</Carousel>
