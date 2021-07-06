import Canvas from "./Canvas";
import ScrollEvents from "./events/ScrollEvents";
import StickerTouchEvents from "./events/StickerTouchEvent";
import Options from "./Options";
import Sticker from "./Sticker";
import ToolButtons from "./ToolButtons";
import { getResizeFillWidthHeight, getResizeImage } from "./util/Resize";

class ImageEditor {
	private canvas: Canvas;
	private option: any;
	private sticker: Sticker;
	private wrapper: HTMLDivElement;
	private canvasWrapper: HTMLDivElement;
	private imgUrl: string;

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

		const headerDiv = document.createElement("div");
		headerDiv.classList.add("header");
		this.wrapper.appendChild(headerDiv);

		const canvasWrapper = document.createElement("div");
		canvasWrapper.classList.add("canvas-wrapper");
		canvasWrapper.style.height = this.wrapper.clientWidth + "px";
		this.canvasWrapper = canvasWrapper;

		this.touchEventRegistry();
		target.appendChild(canvasWrapper);
		const img = new Image();
		img.src = options.baseImage;
		this.imgUrl = options.baseImage;
		img.onload = () => {
			this.initImageSet.call(this, img);
		};
	}

	touchEventRegistry() {
		const ScrollEvent = new ScrollEvents(this.canvasWrapper);
		this.canvasWrapper.ontouchstart = ScrollEvent.startHandler;
		this.canvasWrapper.ontouchmove = ScrollEvent.moveHandler;

		this.canvasWrapper.ontouchcancel = ScrollEvent.endHander;
		this.canvasWrapper.ontouchend = ScrollEvent.endHander;
	}

	toCenterScroll() {
		const moveToScrollLeft = this.canvasWrapper.clientWidth / 4;
		const moveToScrollTop = this.canvasWrapper.clientHeight / 4;
		this.canvasWrapper.onscroll = () => {
			this.canvas.setScrollPoint({
				left: (this.canvasWrapper.scrollLeft / this.canvasWrapper.clientWidth) * 100,
				top: (this.canvasWrapper.scrollTop / this.canvasWrapper.clientHeight) * 100,
			});
		};
		this.canvasWrapper.scroll(moveToScrollLeft, moveToScrollTop);
	}

	setOptions() {
		const optionWrapper = document.createElement("div");
		const options = new Options(this.option, this.canvas);
		const sticker = new Sticker(
			this.option.images,
			new StickerTouchEvents(this.canvas, this.wrapper, this.canvasWrapper)
		);
		const div = document.createElement("div");
		sticker.imageList.map((image) => div.appendChild(image));
		optionWrapper.appendChild(div);
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

			canvas.classList.add("image-canvas");

			canvas.width = width;
			canvas.height = height;

			this.canvasWrapper.appendChild(canvas);
			this.canvasWrapper.ondrop = (ev) => {
				console.log(ev);
			};
			this.canvas = new Canvas(canvas, {
				left: this.canvasWrapper.clientWidth / 4,
				top: this.canvasWrapper.clientHeight / 4,
			});

			const { file } = getResizeImage(resizeImg, width > height ? width : height);
			const initImage = new Image();
			initImage.src = URL.createObjectURL(file);
			initImage.onload = () => {
				this.canvas.addImage(initImage, { selectable: false });
				this.canvas.clearHistory();
				this.toCenterScroll();
				this.setOptions();
			};
		};
	}
}

export default ImageEditor;
