<script module>
	export const code = `
	<Carousel axis={{ default: 'y' }} {slides} layout={{ default: 2 }} partialDelta={{ default: 100 }} containerClass="max-h-[500px]">
		{#snippet slide({ slide })}
			<Slide {...slide} />
		{/snippet}
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '../lib/Carousel.svelte';
	import { slides } from './slides.js';
	import Slide from './Slide.svelte';
</script>

<Carousel axis={{ default: 'y' }} {slides} layout={{ default: 2 }} partialDelta={{ default: 100 }} containerClass="max-h-[500px]">
	{#snippet slide({ slide })}
		<Slide {...slide} />
	{/snippet}
</Carousel>
