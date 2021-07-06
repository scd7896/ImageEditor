import Canvas from "../Canvas";

class StickerTouchEvents {
	public target: HTMLImageElement;
	public rootWrapper: HTMLElement;
	public canvasWrapper: HTMLElement;
	public canvas: Canvas;

	constructor(canvas: Canvas, parent: HTMLElement, canvasWrapper: HTMLElement) {
		this.rootWrapper = parent;
		this.canvasWrapper = canvasWrapper;
		this.canvas = canvas;
		this.touchStart = this.touchStart.bind(this);
		this.touchMove = this.touchMove.bind(this);
		this.touchEnd = this.touchEnd.bind(this);
	}

	touchStart(ev: TouchEvent) {
		const { clientX, clientY } = ev.targetTouches.item(0);
		const image = ev.targetTouches.item(0).target as HTMLImageElement;

		this.target = document.createElement("img");
		this.target.style.position = "absolute";
		this.target.style.top = clientY + "px";
		this.target.style.left = clientX + "px";
		this.target.src = image.src;

		this.rootWrapper.appendChild(this.target);
	}

	touchEnd(ev: TouchEvent) {
		const touchItem = ev.changedTouches.item(0);
		const left = touchItem.clientX + this.canvasWrapper.scrollLeft;
		const top = touchItem.clientY + this.canvasWrapper.scrollTop - 64;

		this.canvas.addImage(this.target, { top, left });
		this.rootWrapper.removeChild(this.target);
	}

	touchMove(ev: TouchEvent) {
		const { clientX, clientY } = ev.targetTouches.item(0);
		this.target.style.position = "absolute";
		this.target.style.top = clientY + "px";
		this.target.style.left = clientX + "px";
	}
}

export default StickerTouchEvents;
