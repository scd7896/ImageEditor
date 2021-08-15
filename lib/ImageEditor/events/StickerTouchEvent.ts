import Canvas from "../Canvas";
import { getWindowCenter } from "../util/getWindowCenter";

class StickerTouchEvents {
	public canvasWrapper: HTMLElement;
	public canvas: Canvas;

	constructor(canvas: Canvas, canvasWrapper: HTMLElement) {
		this.canvasWrapper = canvasWrapper;
		this.canvas = canvas;
		this.clickEvent = this.clickEvent.bind(this);
	}

	clickEvent(ev: MouseEvent) {
		const img = ev.target as HTMLImageElement;

		this.canvas.addImage(img, getWindowCenter(this.canvasWrapper, img.width, img.height));
	}
}

export default StickerTouchEvents;
