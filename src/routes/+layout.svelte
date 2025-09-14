<script>
	import '../app.css';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
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

<div class="navbar justify-between bg-base-100 sticky top-0 left-0 z-10">
	<div>
		<a class="btn btn-ghost normal-case text-xl md:inline-flex hidden" href="#intro"
			>Svelte light carousel</a
		>
		<a class="btn btn-ghost normal-case" href="#examples">Examples</a>
		<a class="btn btn-ghost normal-case" href="#props">Props</a>
		<a class="btn btn-ghost normal-case" href="#slots">Snippets</a>
	</div>
	<a
		class="btn btn-ghost normal-case inline-flex"
		href="https://github.com/beynar/svelte-light-carousel"
		title="github"
	>
		<svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 fill-slate-400"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
			/></svg
		>
		<div class="md:inline-flex hidden">Star on Github</div>
	</a>
</div>
{@render children?.()}

<div class="navbar bg-base-100 sticky top-0 left-0 z-10">
	<a
		class="btn btn-ghost normal-case inline-flex"
		href="https://github.com/beynar/svelte-light-carousel"
	>
		<svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 fill-slate-400"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
			/></svg
		>
		Star on Github</a
	>
</div>
