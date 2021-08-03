import * as icons from "../icons";
import ShapeEvent from "./events/ShapeEvent";
import { shapeList } from "./util/constant";
import { findTargetElementByType } from "./util/events";

class Shape {
	constructor(shapeWrapper: HTMLDivElement, shapeEvent: ShapeEvent) {
		shapeList.map((title) => {
			const button = document.createElement("button");
			const iconName = title + "SVG";
			if (icons[iconName]) {
				button.innerHTML = icons[iconName]();
			}
			button.dataset.type = "shape";
			button.dataset.target = title;
			button.classList.add("shapeButton");
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
