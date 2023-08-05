<script context="module">
	export const code = `
	<Carousel {slides} layout={{ default: 2 }} partialDelta={{ default: 100 }}>
		<Slide slot="slide" let:slide {...slide} />
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '../lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel
	{slides}
	layout={{ sm: 1, default: 2 }}
	gaps={{ xs: 5, sm: 10, default: 20 }}
	partialDelta={{ xs: 20, sm: 40, md: 60, lg: 80, xl: 100 }}
>
	<Slide slot="slide" let:slide {...slide} />
</Carousel>
