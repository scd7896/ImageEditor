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
	}

	addRect(color) {
		this.canvas.addRect(color);
	}

	getImage() {
		return this.canvas.getImage();
	}
}

export default ImageEditor;
