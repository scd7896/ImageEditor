import Canvas from "../Canvas";

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
		const halfWidth = window.innerWidth / 2;
		const top = halfWidth - img.width / 2;
		const left = halfWidth - img.height / 2;

		this.canvas.addImage(img, {
			top: this.canvasWrapper.scrollTop + top,
			left: this.canvasWrapper.scrollLeft + left,
		});
	}
}

export default StickerTouchEvents;
