<script context="module">
	export const code = `
	<Carousel
		{slides}
		layout={{
			xs: 1,
			sm: 1,
			md: 2,
			lg: 3,
			xl: 4
		}}
	>
		<Slide slot="slide" let:slide {...slide} />
	</Carousel>
	`;
</script>

<script lang="ts">
	import Carousel from '$lib/Carousel.svelte';
	import Slide from './Slide.svelte';
	import { slides } from './slides.js';
</script>

<Carousel
	{slides}
	layout={{
		xs: 1,
		sm: 1,
		md: 2,
		lg: 3,
		xl: 4
	}}
>
	<Slide slot="slide" let:slide {...slide} />
</Carousel>
