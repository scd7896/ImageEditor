export interface ICanvasState {
	selectedColor?: string;
	selectedWidth?: number;
	mode?: string;
	brushWidth?: number;
	selected?: fabric.Object[] | null;
}
