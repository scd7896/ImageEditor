export interface ICanvasState {
	selectedFillColor?: string;
	selectedStrokeColoe?: string;
	selectedWidth?: number;
	mode?: string;
	brushWidth?: number;
	selected?: fabric.Object[] | null;
	showStickerMode?: boolean;
	showShapeMode?: boolean;
}
