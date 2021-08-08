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
			this.canvas.setState({
				selectedWidth: parseInt(target.dataset.width, 10),
			});
			this.canvas.drwaingModeOn();
		}
	}
}

export default PenEvent;
