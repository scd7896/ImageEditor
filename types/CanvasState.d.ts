export type Mode = "pen" | "sticker" | "shape" | "normal";

export interface ICanvasState {
	selectedFillColor?: string;
	mode?: Mode;
	brushWidth?: number;
	selected?: fabric.Object[] | null;
	viewSelectColorPicker?: boolean;
}
export interface IObserverState {
	onStateUpdate: (nextState: ICanvasState) => void;
}
