import { Point } from "fabric/fabric-impl";
import Canvas from "./Canvas";
import Options from "./Options";
import Sticker from "./Sticker";
import ToolButtons from "./ToolButtons";
import { getResizeFillWidthHeight, getResizeImage } from "./util/Resize";
declare var process: {
	env: {
		NODE_ENV: string;
	};
};

class Pointer {
	x: number | null;
	y: number | null;

	constructor() {
		this.x = null;
		this.y = null;
	}

	pointInitSet() {
		this.x = null;
		this.y = null;
	}

	setPoint({ x, y }: { x: number; y: number }) {
		this.x = x;
		this.y = y;
	}
}
class DevelopDiffList {
	public flag: boolean;
	public count: number;

	constructor() {
		this.flag = false;
		this.count = 2;
		window.addEventListener("keydown", (ev) => {
			if (ev.key === "z") {
				this.flag = true;
			} else {
				this.flag = false;
			}
		});

		window.addEventListener("keyup", () => {
			this.flag = false;
		});
	}
}
class ImageEditor {
	private canvas: Canvas;
	private option: any;
	private sticker: Sticker;
	private wrapper: HTMLDivElement;
	private canvasWrapper: HTMLDivElement;
	private imgUrl: string;
	private develoVersionKey: DevelopDiffList | null;
	private pointer1: Pointer;
	private pointer2: Pointer;

	constructor(wrapper: string | HTMLDivElement, options) {
		let target: HTMLDivElement;
		this.pointer1 = new Pointer();
		this.pointer2 = new Pointer();
		this.option = options;
		this.develoVersionKey = new DevelopDiffList();

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

		this.canvasWrapper.ontouchcancel = this.end_handler.bind(this);
		this.canvasWrapper.ontouchend = this.end_handler.bind(this);
	}

	end_handler() {
		this.pointer1.pointInitSet();
		this.pointer2.pointInitSet();
	}

	move_handler(ev: TouchEvent) {
		ev.preventDefault();

		if (ev.touches.length >= this.develoVersionKey.count || this.develoVersionKey.flag) {
			ev.stopImmediatePropagation();
			const touch1 = ev.touches.item(0);
			const touch2 = ev.touches.item(1);
			const { x: firstX, y: firstY } = this.pointer1;
			const { x: secondX, y: seconddY } = this.pointer2;
			let firstDiffX = touch1.clientX - firstX;
			let firstDiffY = touch1.clientY - firstY;

			if (touch2) {
				const secondDiffX = touch2.clientX - secondX;
				const secondDiffY = touch2.clientY - seconddY;
				firstDiffX += secondDiffX;
				firstDiffY += secondDiffY;
				this.pointer2.setPoint({ x: touch2.clientX, y: touch2.clientY });
			}

			this.canvasWrapper.scroll(this.canvasWrapper.scrollLeft - firstDiffX, this.canvasWrapper.scrollTop - firstDiffY);
			this.pointer1.setPoint({ x: touch1.clientX, y: touch1.clientY });

			return false;
		}
	}

	start_handler(ev: TouchEvent) {
		ev.preventDefault();
		if (ev.targetTouches.length >= this.develoVersionKey.count || this.develoVersionKey.flag) {
			const touch1 = ev.touches.item(0);
			const touch2 = ev.touches.item(1);
			this.pointer1.setPoint({ x: touch1.clientX, y: touch1.clientY });

			if (touch2) {
				this.pointer2.setPoint({ x: touch2.clientX, y: touch2.clientY });
			}
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
		resizeImg.src = this.imgUrl;

		resizeImg.onload = () => {
			const canvas = document.createElement("canvas");

			canvas.classList.add("image-canvas");

			canvas.width = width;
			canvas.height = height;

			this.canvasWrapper.appendChild(canvas);
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
