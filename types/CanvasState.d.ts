export type Mode = "pen" | "sticker" | "shape" | "normal";

export interface ICanvasState {
	selectedFillColor?: string;
	selectedWidth?: number;
	mode?: Mode;
	brushWidth?: number;
	selected?: fabric.Object[] | null;
	viewSelectColorPicker?: boolean;
}
