<script context="module">
	export const code = `
	// 5 seconds auto play
	<Carousel autoPlay={5} {slides}>
		<Slide slot="slide" let:slide {...slide} />
	</Carousel>`;
</script>

<script lang="ts">
	import Carousel from '../lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel autoPlay={5} {slides}>
	<Slide slot="slide" let:slide {...slide} />
</Carousel>
