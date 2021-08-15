import Pointer from "./Pointer";

class ScrollEvents {
	private pointer1: Pointer;
	private pointer2: Pointer;
	private canvasWrapper: HTMLElement;

	constructor(canvasWrapper) {
		this.pointer1 = new Pointer();
		this.pointer2 = new Pointer();
		this.canvasWrapper = canvasWrapper;
		this.moveHandler = this.moveHandler.bind(this);
		this.endHander = this.endHander.bind(this);
		this.startHandler = this.startHandler.bind(this);
	}

	moveHandler(ev: TouchEvent) {
		ev.preventDefault();

		if (ev.touches.length >= 2) {
			ev.stopImmediatePropagation();
			const touch1 = ev.touches.item(0);
			const touch2 = ev.touches.item(1);
			const { x: firstX, y: firstY } = this.pointer1;
			const { x: secondX, y: seconddY } = this.pointer2;
			let firstDiffX = touch1.clientX - firstX;
			let firstDiffY = touch1.clientY - firstY;

			if (touch2) {
				const secondDiffX = touch2.clientX - secondX;
				const secondDiffY = touch2.clientY - seconddY;
				firstDiffX += secondDiffX;
				firstDiffY += secondDiffY;
				this.pointer2.setPoint({ x: touch2.clientX, y: touch2.clientY });
			}

			this.canvasWrapper.scroll(this.canvasWrapper.scrollLeft - firstDiffX, this.canvasWrapper.scrollTop - firstDiffY);
			this.pointer1.setPoint({ x: touch1.clientX, y: touch1.clientY });

			return false;
		}
	}

	startHandler(ev: TouchEvent) {
		ev.preventDefault();
		if (ev.targetTouches.length >= 2) {
			const touch1 = ev.touches.item(0);
			const touch2 = ev.touches.item(1);
			this.pointer1.setPoint({ x: touch1.clientX, y: touch1.clientY });

			if (touch2) {
				this.pointer2.setPoint({ x: touch2.clientX, y: touch2.clientY });
			}
			return false;
		}
	}

	endHander() {
		this.pointer1.pointInitSet();
		this.pointer2.pointInitSet();
	}
}

export default ScrollEvents;
