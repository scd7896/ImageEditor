import ShapeEvent from "./events/ShapeEvent";
import { shapeList } from "./util/constant";
import { findTargetElementByType } from "./util/events";

class Shape {
	constructor(shapeWrapper: HTMLDivElement, shapeEvent: ShapeEvent) {
		shapeList.map((title) => {
			const button = document.createElement("button");
			button.textContent = title;
			button.dataset.type = "shape";
			button.dataset.target = title;
			shapeWrapper.appendChild(button);
			return button;
		});

		shapeWrapper.addEventListener("click", (event: any) => {
			const target = findTargetElementByType(event.target, "shape");
			if (target) {
				if (target.dataset.target === "rect") {
					shapeEvent.rectClickEvent();
				}
				if (target.dataset.target === "circle") {
					shapeEvent.circleClickEvent();
				}
				if (target.dataset.target === "triangle") {
					shapeEvent.triangleClickEvent();
				}
			}
		});
	}
}

export default Shape;
