<script module>
	export const code = `
	<Carousel dragFree {slides}>
		{#snippet slide({ slide })}
			<Slide {...slide} />
		{/snippet}
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '../lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel dragFree {slides}>
	{#snippet slide({ slide })}
		<Slide {...slide} />
	{/snippet}
</Carousel>
