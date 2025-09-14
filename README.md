# Svelte light carousel

A lightweight carousel component for Svelte focused on low runtime and minimalism.

```bash
npm i svelte-light-carousel
pnpm add svelte-light-carousel
yarn add svelte-light-carousel
bun add svelte-light-carousel
```

## Usage

```svelte
<script>
	import Carousel from 'svelte-light-carousel';
	const slides = Array.from({ length: 10 }, (_, i) => ({ title: `${i + 1}` }));
</script>

<Carousel {slides}>
	{#snippet slide({ slide })}
		{slide.title}
	{/snippet}
</Carousel>
```

## Features

<!-- START:FEATURES -->
- Lightweight, no dependencies < 2kb of JS and < 2kb of Svelte
- Rely on CSS for layout => no shifting
- Enough features to cover most basic (e-commerce) use cases
- 100% headless and customizable
- Snippets for arrows, pagination, progress bar, and dots, so you can build your own UI
- Rely on CSS native scroll behavior on mobile and mouse wheel on desktop
- Accessible WAI-ARIA compliant + good semantic structure
- Preserve trackpad and mouse wheel's native behavior
- Performant, no complicated calculation, rely on RAF for sliding animations
- Can show partial view of the next slide
- Responsive properties: layout, gap, delta and native scroll disabling
- Snapping and drag free option
- Auto play  with pause on hover option
- Vertical layout option (with auto height calculation enabled by default, but can be disabled)
- SSR friendly
- Disable click on child when dragging
- Won't crush your lighthouse score at all
<!-- END:FEATURES -->

## Props

<!-- START:PROPS -->
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| id | string | random | The base id for the carousel and its accessible properties. |
| slides | $$Generic[] | [] | The slides to be rendered. |
| withGrabCursor | boolean | true | Whether the cursor should change to a grab cursor when hovering over the carousel. |
| key | keyof Slide | undefined | Property of the slide to use as a key in the eached block. |
| axis | "x" | "y" | x | The axis of the carousel. |
| dragFree | boolean | false | Whether the carousel should be able to be dragged freely. |
| disableNativeScroll | ResponsiveProperty<boolean> | false | Whether the native scroll should be disabled. |
| oneAtTime | boolean | false | Whether only one slide should be scrolled at a time. |
| autoHeight | boolean | axis === "y" | Whether the carousel should compute its height itself. This introduce a layout shift when the carousel is loaded. |
| autoPlay | number | 0 | The number of seconds between each slide. 0 means it's disabled. |
| layout | ResponsiveProperty<number> | 1 | The number of slides to be displayed at a given viewport. |
| gap | ResponsiveProperty<number> | 20 | The gap between slides to be displayed at a given viewport. |
| partialDelta | ResponsiveProperty<number> | 0 | The amount of visible pixels of the next slide |
| class | string | "" | The class of the carousel slider container. |
| containerClass | string | "" | The class of the carousel container. |
| slideClass | string | "" | The class of the carousel slide. |
<!-- END:PROPS -->

## Snippets

<!-- START:SLOTS -->
### slide
Render the slide inside the carousel.
<!-- START:slide -->
| Name | Type |
| ---- | ---- |
| slide | $$Generic |
| inView | boolean |
| index | boolean |
<!-- END:slide -->
### prev
Render the previous button.
<!-- START:prev -->
| Name | Type |
| ---- | ---- |
| canScrollPrev | boolean |
| prev | () => void |
<!-- END:prev -->
### next
Render the next button.
<!-- START:next -->
| Name | Type |
| ---- | ---- |
| canScrollNext | boolean |
| next | () => void |
<!-- END:next -->
### pagination
Render the pagination. Useful if you want to group prev and next together.
<!-- START:pagination -->
| Name | Type |
| ---- | ---- |
| canScrollPrev | boolean |
| prev | typeof prev |
| canScrollNext | boolean |
| next | typeof next |
| nextA11y | ButtonsA11y['a11y'] |
| prevA11y | ButtonsA11y['a11y'] |
<!-- END:pagination -->
### progress
Render the progress bar indicator.
<!-- START:progress -->
| Name | Type |
| ---- | ---- |
| progress | number |
| scrollTo | (e: PointerEvent) => void |
<!-- END:progress -->
### dots
Render the dots navigation.
<!-- START:dots -->
| Name | Type |
| ---- | ---- |
| dots | {active: boolean, a11y: DotA11y}[] |
| scrollTo | (index: number) => void |
<!-- END:dots -->
<!-- END:SLOTS -->
