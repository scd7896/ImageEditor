import Canvas from "./Canvas";
import Options from "./Options";
import Sticker from "./Sticker";
import ToolButtons from "./ToolButtons";
import { getResizeFillWidthHeight } from "./util/Resize";

class ImageEditor {
	private canvas: Canvas;
	private option: any;
	private sticker: Sticker;
	private wrapper: HTMLDivElement;
	private canvasWrapper: HTMLDivElement;
	private dummyDiv: HTMLDivElement;
	private imgUrl: string;
	private cropPoint: { top: number; left: number };

	constructor(wrapper: string | HTMLDivElement, options) {
		let target: HTMLDivElement;
		this.option = options;
		if (typeof wrapper === "string") {
			target = document.querySelector(`#${wrapper}`) as HTMLDivElement;
		} else {
			target = wrapper;
		}
		target.classList.add("wrapper");
		this.wrapper = target;

		const canvasWrapper = document.createElement("div");
		canvasWrapper.classList.add("canvas-wrapper");
		canvasWrapper.style.height = this.wrapper.clientWidth + "px";
		this.canvasWrapper = canvasWrapper;

		target.appendChild(canvasWrapper);
		const img = new Image();
		img.src = options.baseImage;
		this.imgUrl = options.baseImage;
		img.onload = () => {
			this.initImageSet.call(this, img);
		};
	}

	toCenterScroll() {
		const moveToScrollLeft = this.canvasWrapper.clientWidth / 4;
		const moveToScrollTop = this.canvasWrapper.clientHeight / 4;
		this.canvasWrapper.onscroll = () => {
			this.cropPoint.left = this.canvasWrapper.scrollLeft;
			this.cropPoint.top = this.canvasWrapper.scrollTop;
		};
		this.canvasWrapper.scroll(moveToScrollLeft, moveToScrollTop);
	}

	setOptions() {
		const optionWrapper = document.createElement("div");
		const options = new Options(this.option, this.canvas);
		new ToolButtons(options, optionWrapper, this.option.buttons);
		this.wrapper.appendChild(optionWrapper);
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
			canvas.classList.add("image-canvas");

			canvas.width = width;
			canvas.height = height;
			dummyDiv.style.width = canvas.width + "px";
			dummyDiv.style.height = canvas.height + "px";
			this.dummyDiv = dummyDiv;

			this.canvasWrapper.appendChild(dummyDiv);
			this.canvasWrapper.appendChild(canvas);
			this.canvas = new Canvas(canvas);
			this.canvas.addImage(resizeImg, { selectable: false });
			this.canvas.clearHistory();
			this.toCenterScroll();
			this.setOptions();
		};
	}
}

export default ImageEditor;
