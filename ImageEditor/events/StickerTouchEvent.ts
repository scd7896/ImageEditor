import Canvas from "../Canvas";

class StickerTouchEvents {
	public target: HTMLImageElement;
	public parent: HTMLElement;
	public canvas: Canvas;

	constructor(canvas: Canvas, parent: HTMLElement) {
		this.parent = parent;
		this.canvas = canvas;
		this.touchStart = this.touchStart.bind(this);
		this.touchMove = this.touchMove.bind(this);
		this.touchEnd = this.touchEnd.bind(this);
	}

	touchStart(ev: TouchEvent) {
		const { pageX, pageY } = ev.targetTouches.item(0);
		const image = ev.targetTouches.item(0).target as HTMLImageElement;

		this.target = document.createElement("img");
		this.target.style.position = "absolute";
		this.target.style.top = pageY + "px";
		this.target.style.left = pageX + "px";
		this.target.src = image.src;

		this.parent.appendChild(this.target);
	}

	touchEnd(ev: TouchEvent) {
		this.canvas.addImage(this.target);
		this.parent.removeChild(this.target);
	}

	touchMove(ev: TouchEvent) {
		const { pageX, pageY } = ev.targetTouches.item(0);
		this.target.style.position = "absolute";
		this.target.style.top = pageY + "px";
		this.target.style.left = pageX + "px";
	}
}

export default StickerTouchEvents;
