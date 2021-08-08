import PenEvent from "./events/PenEvent";
import { penSizeList } from "./util/constant";

class Pen {
	constructor(wrapper: HTMLDivElement, event: PenEvent) {
		penSizeList.map((size) => {
			const button = document.createElement("div");
			button.dataset.type = "size";
			button.dataset.width = size.toString();
			button.style.width = size + "px";
			button.style.height = size + "px";
			button.classList.add("penSizeButton");
			wrapper.appendChild(button);
		});
	}
}

export default Pen;
