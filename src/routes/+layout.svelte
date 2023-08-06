<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Svelte light carousel</title>
	<meta name="description" content="A lightweight carousel component for Svelte" />
	<meta name="keywords" content="svelte, carousel, light, lightweight, component" />
	<meta name="author" content="Beynar" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#1e1e1e" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://svelte-light-carousel.vercel.app" />
	<meta name="twitter:creator" content="@_beynar" />
	<meta name="twitter:title" content="Svelte light carousel" />
	<meta name="twitter:description" content="A lightweight carousel component for Svelte" />
	<meta name="twitter:image" content="https://svelte-light-carousel.vercel.app/og.jpg" />
	<meta property="og:title" content="Svelte light carousel" />
	<meta property="og:description" content="A lightweight carousel component for Svelte" />
	<meta property="og:image" content="https://svelte-light-carousel.vercel.app/og.jpg" />
	<meta property="og:url" content="https://svelte-light-carousel.vercel.app" />
	<meta property="og:site_name" content="Svelte light carousel" />
	<meta property="og:type" content="website" />
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="navbar bg-base-100 sticky top-0 left-0 z-10">
	<a class="btn btn-ghost normal-case text-xl md:inline-flex hidden" href="#intro"
		>Svelte light carousel</a
	>
	<a class="btn btn-ghost normal-case" href="#examples">Examples</a>
	<a class="btn btn-ghost normal-case" href="#props">Props</a>
	<a class="btn btn-ghost normal-case" href="#slots">Slots</a>
</div>
<slot />
