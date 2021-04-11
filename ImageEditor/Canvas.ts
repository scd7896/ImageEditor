import { fabric } from "fabric";

class Canvas {
	private canvas: fabric.Canvas;
	private resorceCanvas: HTMLCanvasElement;
	private selected: fabric.Object[] | null = null;

	constructor(canvas: HTMLCanvasElement) {
		const target: HTMLCanvasElement = canvas;
		this.resorceCanvas = target;
		this.canvas = new fabric.Canvas(target);
		this.selectedEvent();
		this.addRect = this.addRect.bind(this);
	}

	toInitSet() {
		this.canvas.isDrawingMode = false;
		this.selected = null;
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

	drwaingModeOn(color = "#000", width = 30) {
		this.canvas.isDrawingMode = true;
		this.canvas.freeDrawingBrush.color = color;
		this.canvas.freeDrawingBrush.width = width;
	}

	drwaingModeOff() {
		this.canvas.isDrawingMode = false;
	}

	getImage() {
		return this.resorceCanvas.toDataURL("image/png");
	}

	getSelected() {
		return this.selected;
	}
}

export default Canvas;
