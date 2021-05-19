import Canvas from "./Canvas";
import Layer from "./Layer";
import Options from "./Options";
import Sticker from "./Sticker";
import ToolButtons from "./ToolButtons";
import { getResizeImage } from "./util/Resize";

class ImageEditor {
	private canvas: Canvas;
	private options: Options;
	private sticker: Sticker;

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
		const stickerWrapperDiv = document.createElement("div");

		wrapperDiv.classList.add("wrapper");
		optionWrapperDiv.classList.add("option-wrapper");
		wrapperDiv.appendChild(target);
		wrapperDiv.appendChild(optionWrapperDiv);
		wrapperDiv.appendChild(stickerWrapperDiv);

		parent.appendChild(wrapperDiv);

		this.canvas = new Canvas(target);
		this.initImageSet(options.baseImage);
		new Layer(wrapperDiv, this.canvas);
		this.options = new Options(options, this.canvas);
		this.sticker = new Sticker(options.images, this.canvas);
		new ToolButtons(this.options, optionWrapperDiv, options.buttons);

		this.sticker.imageList.map((img) => {
			stickerWrapperDiv.appendChild(img);
		});

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

	initImageSet(imageUrl: string) {
		const image = document.createElement("img");
		image.width = this.canvas.width;
		image.height = this.canvas.height;
		image.src = imageUrl;
		image.onload = () => {
			const lowSize = image.width < image.height ? image.width : image.height;
			const src = URL.createObjectURL(getResizeImage(image, lowSize).file);
			const resizeImage = document.createElement("img");
			resizeImage.src = src;
			resizeImage.onload = () => {
				this.canvas.addImage(resizeImage, { selectable: false });
				this.canvas.clearHistory();
			};
		};
	}

	keyEventListner = ({ key, ctrlKey, metaKey, shiftKey }: KeyboardEvent) => {
		if (ctrlKey || metaKey) {
			this.ctrlKeyEvent(key, shiftKey);
		} else {
			this.notCtrlKeyEvent(key);
		}
	};

	notCtrlKeyEvent(key: string) {
		switch (key) {
			case "[":
				this.canvas.brushWidthDown();
				break;
			case "]":
				this.canvas.brushWidthUp();
				break;
			case "d":
			case "D":
				this.options.clickPen();
				break;
			case "Backspace":
			case "Delete":
				this.canvas.deleteSelected();
				break;
		}
	}

	ctrlKeyEvent(key: string, shiftKey: boolean) {
		switch (key) {
			case "z":
			case "Z":
				if (shiftKey) {
					this.canvas.redo();
				} else {
					this.canvas.undo();
				}
				break;
		}
	}
}

export default ImageEditor;
