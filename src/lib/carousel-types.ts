import type { Snippet } from "svelte";

import {
	type ResponsiveProperty,
	type Dot,
} from "./carousel.js";

export type ButtonsA11y = {
	a11y: {
		"aria-controls": string;
		"aria-label": string;
	};
};

export type DotsA11y = {
	role: string;
	"aria-label": string;
};

export interface Props<TSlide> {
	class?: string;
	id?: string;
	slides?: TSlide[];
	withGrabCursor?: boolean;
	key?: keyof TSlide | undefined;
	axis?: ResponsiveProperty<"x" | "y">;
	dragFree?: boolean;
	disableNativeScroll?: ResponsiveProperty<boolean>;
	disableArrowKeyNav?: boolean;
	oneAtTime?: boolean;
	autoHeight?: boolean;
	autoPlay?: number;
	pauseOnHover?: boolean;
	layout?: ResponsiveProperty;
	gaps?: ResponsiveProperty;
	partialDelta?: ResponsiveProperty;
	containerClass?: string;
	slideClass?: string;
}

export interface Snippets<TSlide> {
	slide: Snippet<[{ slide: TSlide; inView: boolean; index: number }]>;
	pagination?: Snippet<
		[
			{
				canScrollPrev: boolean;
				prev: () => false | void;
				canScrollNext: boolean;
				next: () => false | void;
				nextA11y: ButtonsA11y["a11y"];
				prevA11y: ButtonsA11y["a11y"];
			},
		]
	>;
	prev?: Snippet<
		[{ canScrollPrev: boolean; prev: () => false | void } & ButtonsA11y]
	>;
	next?: Snippet<
		[{ canScrollNext: boolean; next: () => false | void } & ButtonsA11y]
	>;
	progress?: Snippet<[{ progress: number; scrollTo: (e: PointerEvent) => void }]>;
	dots?: Snippet<
		[{ dots: Dot[]; a11y: DotsA11y; scrollTo: (dot: number) => void }]
	>;
}