import Canvas from "../Canvas";
import { getWindowCenter } from "../util/getWindowCenter";

class ShapeEvent {
	canvas: Canvas;
	canvasWrapper: HTMLElement;
	constructor(canvas: Canvas, canvasWrapper: HTMLElement) {
		this.canvas = canvas;
		this.canvasWrapper = canvasWrapper;
	}

	rectClickEvent() {
		const center = getWindowCenter(this.canvasWrapper, 100, 100);
		this.canvas.addRect({ width: 100, height: 100, ...center });
	}

	circleClickEvent() {
		const center = getWindowCenter(this.canvasWrapper, 100, 100);
		console.log("circle");
		this.canvas.addCircle({ width: 100, height: 100, ...center });
	}

	triangleClickEvent() {
		const center = getWindowCenter(this.canvasWrapper, 100, 100);
		this.canvas.addTriangle({ width: 100, height: 100, ...center });
	}
}

export default ShapeEvent;
