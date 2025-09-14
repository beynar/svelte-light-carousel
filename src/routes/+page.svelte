<script lang="ts">
	import SimpleCarousel, { code as simpleCarouselCode } from '../examples/SimpleCarousel.svelte';
	import { props, features, slots } from '../infos.js';
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
	import { scale, slide } from 'svelte/transition';
	import Carousel from '$lib/Carousel.svelte';
	import Slide from '../examples/Slide.svelte';

	let examples = $state([
		{
			component: SimpleCarousel,
			name: 'Simple Carousel',
			description: 'A simple carousel with no controls or progress bar',
			code: simpleCarouselCode,
			preview: true,
			copied: false
		},
		{
			component: CarouselWithDots,
			name: 'Carousel with dots',
			description: 'A carousel with dots to indicate the current slide',
			code: CarouselWithDotsCode,
			preview: true,
			copied: false
		},
		{
			component: CarouselWithProgress,
			name: 'Carousel with progress bar',
			description: 'A carousel with a progress bar to indicate the current slide',
			code: CarouselWithProgressCode,
			preview: true,
			copied: false
		},
		{
			component: CarouselWithArrows,
			name: 'Carousel with arrows',
			description: 'A carousel with arrows to navigate between slides',
			code: CarouselWithArrowsCode,
			preview: true,
			copied: false
		},
		{
			component: CarouselWithPagination,
			name: 'Carousel with pagination',
			description: 'A carousel with pagination to navigate between slides',
			code: CarouselWithPaginationCode,
			preview: true,
			copied: false
		},
		{
			component: CarouselResponsive,
			name: 'Responsive carousel',
			description: 'A carousel with responsive layout',
			code: CarouselResponsiveCode,
			preview: true,
			copied: false
		},
		{
			component: DragFreeCarousel,
			name: 'Drag free carousel',
			description: 'A carousel with drag free option',
			code: fragFreeCarouselCode,
			preview: true,
			copied: false
		},
		{
			component: AutoPlayCarousel,
			name: 'Auto play carousel',
			description: 'A carousel with auto play option',

			code: autoPlayCarouselCode,
			preview: true,
			copied: false
		},
		{
			component: PartialViewCarousel,
			name: 'Partial view carousel',
			description: 'A carousel with partial view option',
			code: partialViewCarouselCode,
			preview: true,
			copied: false
		},
		{
			component: VerticalCarousel,
			name: 'Vertical carousel',
			description: 'A carousel with vertical layout',
			code: verticalCarouselCode,
			preview: true,
			copied: false
		}
	]);

	const copy = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const code = target.textContent;
		target.innerHTML = 'Copied!';
		navigator.clipboard.writeText(code as string);
		setTimeout(() => {
			target.textContent = code as string;
		}, 1000);
	};
</script>

<div
	class="mx-auto md:px-10 px-4 rounded my-10 max-w-5xl w-full py-10 prose prose-sm md:prose-base prose-invert"
>
	<h2 class="scroll-m-20 !text-slate-100" id="intro">Svelte light carousel</h2>

	<div class="mockup-code not-prose">
		<pre
			onpointerdown={copy}
			class="hover:bg-slate-100 md:mx-10 cursor-pointer w-fit rounded"
			data-prefix="$"><code>npm i svelte-light-carousel</code></pre>
		<pre
			onpointerdown={copy}
			class="hover:bg-slate-100 md:mx-10 cursor-pointer w-fit rounded"
			data-prefix="$"><code>pnpm add svelte-light-carousel</code></pre>
		<pre
			onpointerdown={copy}
			class="hover:bg-slate-100 md:mx-10 cursor-pointer w-fit rounded"
			data-prefix="$"><code>yarn add svelte-light-carousel</code></pre>
		<pre
			onpointerdown={copy}
			class="hover:bg-slate-100 md:mx-10 cursor-pointer w-fit rounded"
			data-prefix="$"><code>bun add svelte-light-carousel</code></pre>
	</div>
	<h2 class="!text-slate-100">Features</h2>
	<Carousel
		containerClass="my-10 not-prose"
		slideClass="!text-white !text-center h-full"
		slides={features}
		autoPlay={0}
		pauseOnHover
	>
		{#snippet slide({ slide })}
				<Slide   title={slide} />
			{/snippet}
	</Carousel>
	<ul class="px-0">
		{#each features as feature}
			<li class="flex h-fit items-start gap-2 !my-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 stroke-primary !my-0"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div class="flex-1">
					{feature}
				</div>
			</li>
		{/each}
	</ul>
	<h2 id="examples" class="scroll-m-20 !text-slate-100">Examples</h2>
	{#each examples as { component, name, description, preview, copied, code = "" }, i (name)}
		{@const SvelteComponent = component}
		<div>
			<h3>{name}</h3>
			<p>{description}</p>
			<div class="tabs">
				<button
					onclick={() => {
						examples[i].preview = true;
					}}
					class:tab-active={preview}
					class:text-slate-100={preview}
					class="tab tab-lifted text-slate-400">Preview</button
				>
				<button
					onclick={() => {
						examples[i].preview = false;
					}}
					class:tab-active={!preview}
					class:text-slate-100={!preview}
					class="tab tab-lifted text-slate-400">Code</button
				>
			</div>
			<div class="py-4">
				{#key preview}
					<div hidden={!preview} class="not-prose">
						<SvelteComponent />
					</div>
				{/key}

				{#key preview}
					<button
						aria-label="Copy code to clipboard"
						hidden={preview}
						onclick={() => {
							examples[i].copied = true;
							navigator.clipboard.writeText(code);
							setTimeout(() => {
								examples[i].copied = false;
							}, 1000);
						}}
						class="mockup-code w-full text-left not-prose cursor-pointer hover:ring-1 hover:ring-slate-100"
					>
						{#if copied}
							<div
								transition:scale={{ duration: 200 }}
								class="absolute top-4 right-4 origin-top-right font-medium text-sm text-slate-400"
							>
								Copied to clipboard !
							</div>
						{/if}
						<pre>
						<code
								>{@html Prism.highlight(code, Prism.languages.svelte, 'svelte')}
						</code></pre>
					</button>
				{/key}
			</div>
		</div>
	{/each}

	<h2 id="props" class="scroll-m-20 !text-slate-100">Props</h2>
	<div class="overflow-x-auto not-prose">
		<table class="table table-zebra table-sm rounded">
			{#each Object.keys(props[0]) as prop}
				<th>{prop}</th>
			{/each}
			{#each props as prop}
				<tr>
					<td>{prop.name}</td>
					{#if prop.type.includes('ResponsiveProperty')}
						<td class="flex gap-2">
							<div
								class="tooltip"
								data-tip={`type ResponsiveProperty<T> = Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default', T>>;`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
									/>
								</svg>
							</div>
							{prop.type}</td
						>
					{:else}
						<td>{prop.type}</td>
					{/if}
					<td>{prop.default}</td>
					<td>{prop.description}</td>
				</tr>
			{/each}
		</table>
	</div>
	<h2 id="slots" class="scroll-m-20 !text-slate-100">Snippets</h2>
	{#each slots as { name, description, props }}
		<h3>{name}</h3>
		<p>{description}</p>
		<div class="overflow-x-auto not-prose">
			<table class="table table-sm rounded">
				{#each Object.keys(props[0]) as prop}
					<th>{prop}</th>
				{/each}
				{#each props as prop}
					<tr>
						<td>{prop.name}</td>
						<td>{prop.type}</td>
					</tr>
				{/each}
			</table>
		</div>
	{/each}
</div>
