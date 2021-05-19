import { fabric } from "fabric";
import "fabric-history";
import { ICanvasState } from "../types/CanvasState";
import { HistoryCanvas } from "../types/fabric";
import CanvasState from "./CanvasState";
import { canvasImageToFileConverter } from "./util/Resize";
class Canvas extends CanvasState {
	private canvas: HistoryCanvas;
	private resorceCanvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement) {
		super();
		const target: HTMLCanvasElement = canvas;
		this.resorceCanvas = target;
		this.canvas = <HistoryCanvas>new fabric.Canvas(target);
		this.selectedEvent();
		this.addRect = this.addRect.bind(this);
	}

	didStateUpdate(nextState: ICanvasState) {
		if (this.canvas && this.canvas.isDrawingMode) {
			this.canvas.freeDrawingBrush.color = nextState.selectedColor;
			this.canvas.freeDrawingBrush.width = nextState.brushWidth;
		}
	}

	selectedEvent() {
		function handleSelect(obj: any) {
			this.setState({ ...this.state, selected: obj.selected });
		}

		this.canvas.on("selection:updated", handleSelect.bind(this));
		this.canvas.on("selection:created", handleSelect.bind(this));
	}

	addRect(color = "#000") {
		const rect = new fabric.Rect({
			width: 50,
			height: 50,
			...this.canvas.getCenter(),
			backgroundColor: color,
			fill: color,
		});

		this.canvas.add(rect);
	}

	deleteSelected() {
		if (this.getSelected()) {
			this.canvas.remove(...this.getSelected());
		}
	}

	drwaingModeOn() {
		this.canvas.isDrawingMode = true;
	}

	drwaingModeOff() {
		this.canvas.isDrawingMode = false;
	}

	downloadImage() {
		const a = document.createElement("a");
		a.href = this.resorceCanvas.toDataURL("image/jpeg");
		a.download = "test.jpeg";
		document.body.appendChild(a);
		a.target = "blank";
		a.click();
	}

	getImage() {
		return canvasImageToFileConverter(this.resorceCanvas, "jpeg");
	}

	getJson() {
		return this.canvas.toJSON();
	}

	addImage(img: HTMLImageElement, options?: { top?: number; left?: number; selectable?: boolean }) {
		const center = {
			left: this.canvas.getCenter().left - img.width / 2,
			top: this.canvas.getCenter().top - img.height / 2,
		};
		const option = options ? { ...center, ...options } : center;

		const image = new fabric.Image(img, {
			width: img.width,
			height: img.height,
			angle: 0,
			...option,
			filters: [
				new fabric.Image.filters.RemoveColor({
					color: "#ffffff",
					threshold: 0,
				}),
			],
		});

		this.canvas.add(image);
	}

	undo() {
		this.canvas.undo();
	}

	redo() {
		this.canvas.redo();
	}

	resetCanvas() {
		this.canvas.clear();
	}

	loadJsonCanvas(json, callback) {
		this.canvas = this.canvas.loadFromJSON(json, callback) as HistoryCanvas;
	}

	clearHistory() {
		this.canvas.clearHistory();
	}

	get undoHistoryLength() {
		return this.canvas.historyUndo.length;
	}

	get redoHistoryLength() {
		return this.canvas.historyRedo.length;
	}

	get width() {
		return this.canvas.width;
	}

	get height() {
		return this.canvas.height;
	}

	getSelected() {
		return this.state.selected;
	}
}

export default Canvas;
