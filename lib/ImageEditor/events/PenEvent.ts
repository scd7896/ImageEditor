import Canvas from "../Canvas";
import { findTargetElementByType } from "../util/events";

class PenEvent {
	canvas: Canvas;
	constructor(canvas: Canvas) {
		this.canvas = canvas;
	}

	sizeClickEvent(event) {
		const target = findTargetElementByType(event.target, "size");
		if (target) {
			const parent = target.parentElement;
			for (let i = 0; i < parent.children.length; i++) {
				const node = parent.children.item(i);
				node.children.item(0).classList.remove("selected");
			}

			this.canvas.setState({
				brushWidth: parseInt(target.dataset.width, 10) / 2,
				mode: "normal",
				viewSelectColorPicker: false,
			});
			target.children.item(0).classList.add("selected");
			this.canvas.drwaingModeOn();
		}
	}
}

export default PenEvent;
