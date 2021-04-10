import { fabric } from "fabric";

class Canvas {
	private canvas: fabric.Canvas;
	private resorceCanvas: HTMLCanvasElement;
	constructor(canvas: HTMLCanvasElement) {
		const target: HTMLCanvasElement = canvas;
		this.resorceCanvas = target;
		this.canvas = new fabric.Canvas(target);
	}

	addRect(color) {
		const rect = new fabric.Rect({
			width: 50,
			height: 50,
			top: this.resorceCanvas.height / 2,
			left: this.resorceCanvas.width / 2,
			backgroundColor: color,
		});

		this.canvas.add(rect);
	}

	getImage() {
		return this.resorceCanvas.toDataURL("image/png");
	}
}

export default Canvas;
