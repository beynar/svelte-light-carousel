<script context="module">
	export const code = `
	<Carousel axis="y" {slides} layout={{ default: 2 }} partialDelta={{ default: 100 }}>
		<Slide slot="slide" let:slide {...slide} />
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '../lib/Carousel.svelte';
	import { slides } from './slides.js';
	import Slide from './Slide.svelte';
</script>

<Carousel axis={{ default: 'y' }} {slides} layout={{ default: 2 }} partialDelta={{ default: 100 }}>
	<Slide slot="slide" let:slide {...slide} />
</Carousel>
