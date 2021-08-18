import { IObserverState } from "../types/CanvasState";
import Canvas from "./Canvas";
import PenEvent from "./events/PenEvent";
import { DEFAULT_WIDTH, penSizeList } from "./util/constant";

class Pen implements IObserverState {
	constructor(wrapper: HTMLDivElement, event: PenEvent) {
		penSizeList.map((size) => {
			const button = document.createElement("div");
			const icon = document.createElement("div");
			button.dataset.type = "size";
			button.dataset.width = size.toString();
			icon.style.width = size + "px";
			icon.style.height = size + "px";
			icon.classList.add("penSizeIcon");
			button.classList.add("penSizeButton");
			button.appendChild(icon);
			if (size === DEFAULT_WIDTH) icon.classList.add("selected");
			wrapper.appendChild(button);
		});
		wrapper.addEventListener("click", event.sizeClickEvent.bind(event));
	}

	onStateUpdate(state) {}
}

export default Pen;
