import Canvas from "./Canvas";
import Options from "./Options";
import Sticker from "./Sticker";
import ToolButtons from "./ToolButtons";
import { getResizeImage } from "./util/Resize";

class ImageEditor {
	private canvas: Canvas;
	private options: Options;
	private sticker: Sticker;
	private target: HTMLCanvasElement;

	constructor(canvas: string | HTMLCanvasElement, options) {
		let target: HTMLCanvasElement;
		if (typeof canvas === "string") {
			target = document.querySelector(`#${canvas}`) as HTMLCanvasElement;
		} else {
			target = canvas;
		}
		const parent = target.parentElement;
		this.target = target;

		parent.removeChild(target);
		const wrapperDiv = document.createElement("div");
		const optionWrapperDiv = document.createElement("div");
		const stickerWrapperDiv = document.createElement("div");

		wrapperDiv.classList.add("wrapper");
		wrapperDiv.style.width = target.width + "px";
		wrapperDiv.style.height = target.height + "px";
		optionWrapperDiv.classList.add("option-wrapper");
		wrapperDiv.appendChild(target);
		wrapperDiv.appendChild(optionWrapperDiv);
		wrapperDiv.appendChild(stickerWrapperDiv);
		parent.appendChild(wrapperDiv);

		this.initImageSet(options.baseImage);
		this.canvas = new Canvas(this.target);
		this.options = new Options(options, this.canvas);
		this.sticker = new Sticker(options.images, this.canvas);
		new ToolButtons(this.options, optionWrapperDiv, options.buttons);

		this.sticker.imageList.map((img) => {
			stickerWrapperDiv.appendChild(img);
		});
	}

	initImageSet(imageUrl: string) {
		const image = document.createElement("img");
		image.src = imageUrl;
		image.onload = () => {
			const imageWidth = image.width;
			const imageHeight = image.height;

			const src = URL.createObjectURL(
				getResizeImage(image, imageWidth > imageHeight ? this.canvas.width : this.canvas.height).file
			);
			const resizeImage = document.createElement("img");
			resizeImage.src = src;
			resizeImage.onload = () => {
				this.target.width = resizeImage.width;
				this.target.height = resizeImage.height;
				this.canvas.addImage(resizeImage, { selectable: false });
				this.canvas.width = resizeImage.width;
				this.canvas.height = resizeImage.height;
				this.canvas.clearHistory();
			};
		};
	}
}

export default ImageEditor;
