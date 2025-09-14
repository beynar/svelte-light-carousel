export const features = [
	'Lightweight, no dependencies < 2kb of JS and < 2kb of Svelte',
	'Rely on CSS for layout => no shifting',
	'Enough features to cover most basic (e-commerce) use cases',
	'100% headless and customizable',
	'Snippets for arrows, pagination, progress bar, and dots, so you can build your own UI',
	'Rely on CSS native scroll behavior on mobile and mouse wheel on desktop',
	'Accessible WAI-ARIA compliant + good semantic structure',
	"Preserve trackpad and mouse wheel's native behavior",
	'Performant, no complicated calculation, rely on RAF for sliding animations',
	'Can show partial view of the next slide',
	'Responsive properties: layout, gap, delta and native scroll disabling',
	'Snapping and drag free option',
	'Auto play  with pause on hover option',
	'Vertical layout option (with auto height calculation enabled by default, but can be disabled)',
	'SSR friendly',
	'Disable click on child when dragging',
	"Won't crush your lighthouse score at all"
];

export const props = [
	{
		name: 'id',
		type: 'string',
		default: 'random',
		description: 'The base id for the carousel and its accessible properties.'
	},
	{
		name: 'slides',
		type: '$$Generic[]',
		default: '[]',
		description: 'The slides to be rendered.'
	},
	{
		name: 'withGrabCursor',
		type: 'boolean',
		default: 'true',
		description:
			'Whether the cursor should change to a grab cursor when hovering over the carousel.'
	},
	{
		name: 'key',
		type: 'keyof Slide',
		default: 'undefined',
		description: 'Property of the slide to use as a key in the eached block.'
	},
	{
		name: 'axis',
		type: '"x" | "y"',
		default: 'x',
		description: 'The axis of the carousel.'
	},
	{
		name: 'dragFree',
		type: 'boolean',
		default: 'false',
		description: 'Whether the carousel should be able to be dragged freely.'
	},
	{
		name: 'disableNativeScroll',
		type: 'ResponsiveProperty<boolean>',
		default: `false`,
		description: 'Whether the native scroll should be disabled.'
	},
	{
		name: 'oneAtTime',
		type: 'boolean',
		default: 'false',
		description: 'Whether only one slide should be scrolled at a time.'
	},
	{
		name: 'autoHeight',
		type: 'boolean',
		default: 'axis === "y"',
		description:
			'Whether the carousel should compute its height itself. This introduce a layout shift when the carousel is loaded.'
	},
	{
		name: 'autoPlay',
		type: 'number',
		default: '0',
		description: "The number of seconds between each slide. 0 means it's disabled."
	},
	{
		name: 'layout',
		type: 'ResponsiveProperty<number>',
		default: '1',
		description: 'The number of slides to be displayed at a given viewport.'
	},
	{
		name: 'gap',
		type: 'ResponsiveProperty<number>',
		default: '20',
		description: 'The gap between slides to be displayed at a given viewport.'
	},
	{
		name: 'partialDelta',
		type: 'ResponsiveProperty<number>',
		default: '0',
		description: 'The amount of visible pixels of the next slide'
	},
	{
		name: 'class',
		type: 'string',
		default: '""',
		description: 'The class of the carousel slider container.'
	},
	{
		name: 'containerClass',
		type: 'string',
		default: '""',
		description: 'The class of the carousel container.'
	},
	{
		name: 'slideClass',
		type: 'string',
		default: '""',
		description: 'The class of the carousel slide.'
	}
];

const slideArray = [
	{
		name: 'slide',
		type: '$$Generic'
	},
	{
		name: 'inView',
		type: 'boolean'
	},
	{
		name: 'index',
		type: 'boolean'
	}
];

const paginationArray = [
	{
		name: 'canScrollPrev',
		type: 'boolean'
	},
	{
		name: 'prev',
		type: 'typeof prev'
	},
	{
		name: 'canScrollNext',
		type: 'boolean'
	},
	{
		name: 'next',
		type: 'typeof next'
	},
	{
		name: 'nextA11y',
		type: "ButtonsA11y['a11y']"
	},
	{
		name: 'prevA11y',
		type: "ButtonsA11y['a11y']"
	}
];

const prevArray = [
	{
		name: 'canScrollPrev',
		type: 'boolean'
	},
	{
		name: 'prev',
		type: '() => void'
	}
];

const nextArray = [
	{
		name: 'canScrollNext',
		type: 'boolean'
	},
	{
		name: 'next',
		type: '() => void'
	}
];

const progressArray = [
	{
		name: 'progress',
		type: 'number'
	},
	{
		name: 'scrollTo',
		type: '(e: PointerEvent) => void'
	}
];

const dotsArray = [
	{
		name: 'dots',
		type: '{active: boolean, a11y: DotA11y}[]'
	},
	{
		name: 'scrollTo',
		type: '(index: number) => void'
	}
];

export const slots = [
	{
		name: 'slide',
		description: 'Render the slide inside the carousel.',
		props: slideArray
	},
	{
		name: 'prev',
		description: 'Render the previous button.',
		props: prevArray
	},
	{
		name: 'next',
		description: 'Render the next button.',
		props: nextArray
	},
	{
		name: 'pagination',
		description: 'Render the pagination. Useful if you want to group prev and next together.',
		props: paginationArray
	},
	{
		name: 'progress',
		description: 'Render the progress bar indicator.',
		props: progressArray
	},
	{
		name: 'dots',
		description: 'Render the dots navigation.',
		props: dotsArray
	}
];
