import Canvas from "./Canvas";
import Options from "./Options";

class ImageEditor {
	private canvas: Canvas;
	private options: Options;

	constructor(canvas: string | HTMLCanvasElement, options) {
		let target: HTMLCanvasElement;
		if (typeof canvas === "string") {
			target = document.querySelector(`#${canvas}`) as HTMLCanvasElement;
		} else {
			target = canvas;
		}
		const parent = target.parentElement;
		parent.removeChild(target);
		const wrapperDiv = document.createElement("div");
		const optionWrapperDiv = document.createElement("div");
		wrapperDiv.classList.add("wrapper");
		optionWrapperDiv.classList.add("option-wrapper");
		wrapperDiv.appendChild(target);
		wrapperDiv.appendChild(optionWrapperDiv);
		parent.appendChild(wrapperDiv);
		this.canvas = new Canvas(target);
		this.options = new Options(options, this.canvas, optionWrapperDiv);
		window.addEventListener("keydown", this.keyEventListner);
		const config = {
			childList: true,
		};
		const observer = new MutationObserver((mutationsList, observer) => {
			mutationsList.map((node) => {
				node.removedNodes.forEach((removeNode) => {
					if (removeNode === wrapperDiv) {
						observer.disconnect();
						window.removeEventListener("keydown", this.keyEventListner);
					}
				});
			});
		});
		observer.observe(wrapperDiv.parentNode, config);
	}

	keyEventListner = ({ key, ctrlKey, metaKey }: KeyboardEvent) => {
		if (ctrlKey || metaKey) {
			this.ctrlKeyEvent(key);
		} else {
			this.notCtrlKeyEvent(key);
		}
	};
	notCtrlKeyEvent(key: string) {}

	ctrlKeyEvent(key: string) {
		console.log(key);
		switch (key) {
			case "z":
			case "Z":
				this.canvas.undo();
				break;
			case "y":
			case "Y":
				this.canvas.redo();
				break;
		}
	}
}

export default ImageEditor;
