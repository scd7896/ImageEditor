import { fabric } from "fabric";
import "fabric-history";
import { ICanvasState } from "../types/CanvasState";
import { HistoryCanvas } from "../types/fabric";
import CanvasState from "./CanvasState";
import { DEFAULT_COLOR, DEFAULT_WIDTH } from "./util/constant";
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
			console.log(obj.target);
			if (obj.target._objects) {
				this.selected = obj.target._objects;
			} else {
				this.selected = [obj.target];
			}
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

	drwaingModeOn() {
		this.canvas.isDrawingMode = true;
	}

	drwaingModeOff() {
		this.canvas.isDrawingMode = false;
	}

	getImage() {
		return canvasImageToFileConverter(this.resorceCanvas);
	}

	getJson() {
		return this.canvas.toJSON();
	}

	getSelected() {
		return this.state.selected;
	}

	addImage(img: HTMLImageElement) {
		const image = new fabric.Image(img, {
			width: img.width,
			height: img.height,
			angle: 0,
			...this.canvas.getCenter(),
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
		console.log(this.canvas);
		this.canvas.undo();
	}

	redo() {
		this.canvas.redo();
	}

	get undoHistoryLength() {
		return this.canvas.historyUndo.length;
	}

	get redoHistoryLength() {
		return this.canvas.historyRedo.length;
	}
}

export default Canvas;
