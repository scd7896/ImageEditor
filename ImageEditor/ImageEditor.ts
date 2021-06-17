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
		this.canvasWrapper.ontouchstart = this.start_handler.bind(this);
		this.canvasWrapper.ontouchmove = this.move_handler.bind(this);

		// this.canvasWrapper.ontouchcancel = end_handler;
		// this.canvasWrapper.ontouchend = end_handler;
	}

	move_handler(ev: TouchEvent) {
		ev.stopImmediatePropagation();
		ev.preventDefault();
		// console.log(ev);
		if (ev.touches.length >= 2) {
			return false;
		}
	}

	start_handler(ev) {
		ev.preventDefault();
		console.log(ev);
		if (ev.targetTouches.length == 2) {
			return false;
		}
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
		new ToolButtons(options, optionWrapper, this.option.buttons);
		this.wrapper.appendChild(optionWrapper);
	}

	async initImageSet(image: HTMLImageElement) {
		const { width, height } = getResizeFillWidthHeight(image, this.wrapper.clientWidth);
		const resizeImg = new Image();
		resizeImg.width = width;
		resizeImg.height = height;
		console.log(width, height);
		resizeImg.src = this.imgUrl;
		resizeImg.onload = () => {
			const canvas = document.createElement("canvas");

			canvas.classList.add("image-canvas");

			canvas.width = width;
			canvas.height = height;

			// this.canvasWrapper.appendChild(dummyDiv);
			this.canvasWrapper.appendChild(canvas);
			this.canvas = new Canvas(canvas, {
				left: this.canvasWrapper.clientWidth / 4,
				top: this.canvasWrapper.clientHeight / 4,
			});
			this.canvas.addImage(resizeImg, { selectable: false });
			this.canvas.clearHistory();
			this.toCenterScroll();
			this.setOptions();
		};
	}
}

export default ImageEditor;
