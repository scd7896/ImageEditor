import Canvas from "./Canvas";
import Options from "./Options";
import Sticker from "./Sticker";
import ToolButtons from "./ToolButtons";
import { getResizeFillWidthHeight } from "./util/Resize";

class ImageEditor {
	private canvas: Canvas;
	private options: Options;
	private sticker: Sticker;
	private wrapper: HTMLDivElement;
	private imgUrl: string;

	constructor(wrapper: string | HTMLDivElement, options) {
		let target: HTMLDivElement;
		if (typeof wrapper === "string") {
			target = document.querySelector(`#${wrapper}`) as HTMLDivElement;
		} else {
			target = wrapper;
		}
		this.wrapper = target;
		this.wrapper.style.height = this.wrapper.clientWidth + "px";
		this.wrapper.classList.add("wrapper");
		const img = new Image();
		img.src = options.baseImage;
		this.imgUrl = options.baseImage;
		img.onload = () => {
			this.initImageSet.call(this, img);
		};
	}

	toCenterScroll() {
		const moveToScrollLeft = this.wrapper.clientWidth / 4;
		const moveToScrollTop = this.wrapper.clientHeight / 4;
		this.wrapper.scroll(moveToScrollLeft, moveToScrollTop);
	}

	async initImageSet(image: HTMLImageElement) {
		const { width, height } = getResizeFillWidthHeight(image, this.wrapper.clientWidth);
		const resizeImg = new Image();
		resizeImg.width = width;
		resizeImg.height = height;
		resizeImg.src = this.imgUrl;
		resizeImg.onload = () => {
			const canvas = document.createElement("canvas");
			const dummyDiv = document.createElement("div");
			dummyDiv.classList.add("dummy");
			canvas.width = width;
			canvas.height = height;
			dummyDiv.style.width = canvas.width + "px";
			dummyDiv.style.height = canvas.height + "px";
			canvas.classList.add("image-canvas");
			canvas.getContext("2d").drawImage(resizeImg, 0, 0);
			this.wrapper.appendChild(dummyDiv);
			this.wrapper.appendChild(canvas);
			this.canvas = new Canvas(canvas);
			this.canvas.addImage(resizeImg, { selectable: false });
			this.canvas.clearHistory();
			this.toCenterScroll();
		};
	}
}

export default ImageEditor;
