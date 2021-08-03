import { ICanvasState, Mode } from "../types/CanvasState";
import Canvas from "./Canvas";
import ScrollEvents from "./events/ScrollEvents";
import StickerTouchEvents from "./events/StickerTouchEvent";
import Options from "./Options";
import Sticker from "./Sticker";
import ToolButtons from "./ToolButtons";
import { getResizeFillWidthHeight, getResizeImage } from "./util/Resize";
import "../css/index.css";
import Shape from "./Shape";
import ShapeEvent from "./events/ShapeEvent";
import { findTargetElementByType } from "./util/events";

const footerButtons = ["shape", "pen", "sticker"];
const headerButtons = ["close", "undo", "redo", "download"];
class ImageEditor {
	private canvas: Canvas;
	private option: any;
	private stickerWrapper: HTMLDivElement;
	private wrapper: HTMLDivElement;
	private canvasWrapper: HTMLDivElement;
	private shapeWrapper: HTMLDivElement;
	private headerDiv: HTMLDivElement;
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
		this.headerDiv = headerDiv;
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

		this.onStateUpdate = this.onStateUpdate.bind(this);
	}

	onStateUpdate(nextState: ICanvasState) {
		switch (nextState.mode) {
			case "shape": {
				this.shapeWrapper.style.display = "flex";
				this.stickerWrapper.style.display = "none";
				break;
			}
			case "sticker": {
				this.stickerWrapper.style.display = "flex";
				this.shapeWrapper.style.display = "none";
				break;
			}

			default: {
				this.stickerWrapper.style.display = "none";
				this.shapeWrapper.style.display = "none";
			}
		}
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

	createStickerWrapper() {
		const sticker = new Sticker(this.option.images, new StickerTouchEvents(this.canvas, this.canvasWrapper));
		const stickerWrapper = document.createElement("div");
		stickerWrapper.style.display = "none";
		stickerWrapper.classList.add("stickerWrapper");
		this.stickerWrapper = stickerWrapper;
		sticker.imageList.map((image) => stickerWrapper.appendChild(image));
		this.wrapper.appendChild(stickerWrapper);
	}

	createShapeWrapper() {
		const shapeWrapper = document.createElement("div");
		shapeWrapper.style.display = "none";
		shapeWrapper.classList.add("shapeWrapper");
		this.shapeWrapper = shapeWrapper;
		new Shape(this.shapeWrapper, new ShapeEvent(this.canvas, this.canvasWrapper));
		this.wrapper.appendChild(shapeWrapper);
	}

	optionWrapperClickListener(event) {
		const target = findTargetElementByType(event.target, "bottomMenu");
		if (target) {
			const mode = target.dataset.mode as Mode;
			this.canvas.setState({
				mode,
			});
		}
	}

	setOptions() {
		const optionWrapper = document.createElement("div");
		const headerOptionWrapper = document.createElement("div");
		optionWrapper.classList.add("optionWrapper");
		headerOptionWrapper.classList.add("headerOptionWrapper");
		const options = new Options(this.option, this.canvas, this.wrapper);
		new ToolButtons(options, optionWrapper, footerButtons);
		new ToolButtons(options, headerOptionWrapper, headerButtons);
		optionWrapper.addEventListener("click", this.optionWrapperClickListener.bind(this));
		this.wrapper.appendChild(optionWrapper);
		this.headerDiv.appendChild(headerOptionWrapper);
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
			this.canvas = new Canvas(
				canvas,
				{
					left: this.canvasWrapper.clientWidth / 4,
					top: this.canvasWrapper.clientHeight / 4,
				},
				this.onStateUpdate
			);

			const { file } = getResizeImage(resizeImg, width > height ? width : height);
			const initImage = new Image();
			initImage.src = URL.createObjectURL(file);
			initImage.onload = () => {
				this.canvas.addImage(initImage, { selectable: false });
				this.canvas.clearHistory();
				this.toCenterScroll();
				this.createStickerWrapper.call(this);
				this.createShapeWrapper.call(this);
				this.setOptions.call(this);
			};
		};
	}
}

export default ImageEditor;
