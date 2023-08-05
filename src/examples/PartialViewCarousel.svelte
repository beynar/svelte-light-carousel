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

<Carousel {slides} layout={{ sm: 1, default: 2 }} partialDelta={{ default: 100 }}>
	<Slide slot="slide" let:slide {...slide} />
</Carousel>
