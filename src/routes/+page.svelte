<script lang="ts">
	import SimpleCarousel, { code as simpleCarouselCode } from '../examples/SimpleCarousel.svelte';
	import CarouselWithDots, {
		code as CarouselWithDotsCode
	} from '../examples/CarouselWithDots.svelte';
	import CarouselWithProgress, {
		code as CarouselWithProgressCode
	} from '../examples/CarouselWithProgress.svelte';
	import CarouselWithArrows, {
		code as CarouselWithArrowsCode
	} from '../examples/CarouselWithArrows.svelte';
	import CarouselWithPagination, {
		code as CarouselWithPaginationCode
	} from '../examples/CarouselWithPagination.svelte';
	import CarouselResponsive, {
		code as CarouselResponsiveCode
	} from '../examples/CarouselResponsive.svelte';
	import DragFreeCarousel, {
		code as fragFreeCarouselCode
	} from '../examples/DragFreeCarousel.svelte';
	import AutoPlayCarousel, {
		code as autoPlayCarouselCode
	} from '../examples/AutoPlayCarousel.svelte';
	import VerticalCarousel, {
		code as verticalCarouselCode
	} from '../examples/VerticalCarousel.svelte';
	import PartialViewCarousel, {
		code as partialViewCarouselCode
	} from '../examples/PartialViewCarousel.svelte';
	import Prism from 'prismjs';
	import 'prism-svelte';

	import { slide } from 'svelte/transition';

	const features = [
		'Lightweight, no dependencies < 2kb of JS and < 3kb of Svelte',
		'Rely on CSS for layout => no shifting',
		'Enough features to cover most basic (e-commerce) use cases',
		'100% headless and customizable',
		'Rely on CSS native scroll behavior on mobile',
		'Accessible',
		"Preserve trackpad and mouse wheel's native behavior",
		'Performant, no complicated calculation, rely on RAF for sliding animations',
		'Can show partial view of the next slide',
		'Responsive properties: layout, gap, and delta',
		'Drag free option',
		'Auto play ready',
		'Vertical layout option (with auto height calculation enabled by default, but can be disabled)',
		'SSR friendly',
		'Disable click on child when dragging',
		'Snapping',
		"Won't crush your lighthouse score at all"
	];

	let examples = [
		{
			component: SimpleCarousel,
			name: 'Simple Carousel',
			description: 'A simple carousel with no controls or progress bar',
			code: simpleCarouselCode,
			preview: false
		},
		{
			component: CarouselWithDots,
			name: 'Carousel with dots',
			description: 'A carousel with dots to indicate the current slide',
			code: CarouselWithDotsCode,
			preview: true
		},
		{
			component: CarouselWithProgress,
			name: 'Carousel with progress bar',
			description: 'A carousel with a progress bar to indicate the current slide',
			code: CarouselWithProgressCode,
			preview: true
		},
		{
			component: CarouselWithArrows,
			name: 'Carousel with arrows',
			description: 'A carousel with arrows to navigate between slides',
			code: CarouselWithArrowsCode,
			preview: true
		},
		{
			component: CarouselWithPagination,
			name: 'Carousel with pagination',
			description: 'A carousel with pagination to navigate between slides',
			code: CarouselWithPaginationCode,
			preview: true
		},
		{
			component: CarouselResponsive,
			name: 'Carousel responsive',
			description: 'A carousel with responsive layout',
			code: CarouselResponsiveCode,
			preview: true
		},
		{
			component: DragFreeCarousel,
			name: 'Drag free carousel',
			description: 'A carousel with drag free option',
			code: fragFreeCarouselCode,
			preview: true
		},
		{
			component: AutoPlayCarousel,
			name: 'Auto play carousel',
			description: 'A carousel with auto play option',

			code: autoPlayCarouselCode,
			preview: true
		},
		{
			component: PartialViewCarousel,
			name: 'Partial view carousel',
			description: 'A carousel with partial view option',
			code: partialViewCarouselCode,
			preview: true
		},
		{
			component: VerticalCarousel,
			name: 'Vertical carousel',
			description: 'A carousel with vertical layout',
			code: verticalCarouselCode,
			preview: true
		}
	];

	const copy = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const code = target.textContent;
		target.innerHTML = 'Copied!';
		const textarea = document.createElement('textarea');
		textarea.value = code as string;
		document.body.appendChild(textarea);
		textarea.select();
		navigator.clipboard.writeText(code as string);
		document.body.removeChild(textarea);
		setTimeout(() => {
			target.textContent = code as string;
		}, 1000);
	};
</script>

<div class="mx-auto px-10 rounded my-10 max-w-5xl w-full py-10 prose prose-sm md:prose-base">
	<h2>Svelte light carousel</h2>
	<div class="mockup-code not-prose">
		<pre
			on:pointerdown={copy}
			class="hover:bg-slate-100 cursor-pointer w-fit rounded"
			data-prefix="$"><code>npm i svelte-light-carousel</code></pre>
		<pre
			on:pointerdown={copy}
			class="hover:bg-slate-100 cursor-pointer w-fit rounded"
			data-prefix="$"><code>pnpm add svelte-light-carousel</code></pre>
		<pre
			on:pointerdown={copy}
			class="hover:bg-slate-100 cursor-pointer w-fit rounded"
			data-prefix="$"><code>yarn add svelte-light-carousel</code></pre>
	</div>
	<h2>Features</h2>
	<ul>
		{#each features as feature}
			<li class="flex max-h-8 items-center gap-2 !my-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 stroke-primary"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				{feature}
			</li>
		{/each}
	</ul>
	<h2>Examples</h2>
	{#each examples as { component, name, description, preview, code = "" }}
		<div>
			<h3>{name}</h3>
			<p>{description}</p>
			<div class="tabs">
				<button
					on:click={() => {
						preview = true;
					}}
					class:tab-active={preview}
					class="tab tab-lifted">Preview</button
				>
				<button
					on:click={() => {
						preview = false;
					}}
					class:tab-active={!preview}
					class="tab tab-lifted">Code</button
				>
			</div>
			<div class="py-4">
				{#key preview}
					<div transition:slide={{ duration: 400 }} hidden={!preview} class="not-prose">
						<svelte:component this={component} />
					</div>{/key}

				{#key preview}
					<div transition:slide={{ duration: 400 }} hidden={preview} class="mockup-code not-prose">
						<pre>
						<code
								>{@html Prism.highlight(code, Prism.languages.svelte, 'svelte')}
						</code></pre>
					</div>
				{/key}
			</div>
		</div>
	{/each}
</div>
