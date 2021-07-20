import { fabric } from "fabric";
import "fabric-history";
import "./events/fabric-history-extension.js";
import { ICanvasState } from "../types/CanvasState";
import { HistoryCanvas } from "../types/fabric";
import CanvasState from "./CanvasState";
import { canvasImageToFileConverter } from "./util/Resize";

type ScrollPoint = {
	left: number;
	top: number;
};

function downloadURL(href: string) {
	const a = document.createElement("a");
	a.href = href;
	const name = window.prompt("파일 명을 적어주세요 (확장자 제외)");
	a.download = `${name}.jpeg`;
	document.body.appendChild(a);
	a.target = "blank";
	a.click();
}

function getImageRatio(width, height) {
	if (width > height) {
		return height / width;
	} else {
		return width / height;
	}
}

function cropImage(canvas: HTMLCanvasElement, iCropLeft, iCropTop) {
	const minVal = canvas.width < canvas.height ? canvas.width : canvas.height;
	const ratio = getImageRatio(canvas.width, canvas.height);
	const imageData = canvas
		.getContext("2d")
		.getImageData(canvas.width * (iCropLeft / 100) * ratio, canvas.height * (iCropTop / 100) * ratio, minVal, minVal);
	const cropCanvas = document.createElement("canvas");
	cropCanvas.width = imageData.width;
	cropCanvas.height = imageData.height;
	cropCanvas.getContext("2d").putImageData(imageData, 0, 0);
	downloadURL(cropCanvas.toDataURL("image/jpeg"));
}

class Canvas extends CanvasState {
	private canvas: HistoryCanvas;
	private scrollPoint: ScrollPoint;
	private resorceCanvas: HTMLCanvasElement;
	private onStateUpdate: Function;

	constructor(
		canvas: HTMLCanvasElement,
		defaultScroll?: ScrollPoint,
		onStateUpdate?: (nextState: ICanvasState) => void
	) {
		super();
		const target: HTMLCanvasElement = canvas;
		this.scrollPoint = defaultScroll;
		target.style.border = "1px solid black";
		this.resorceCanvas = target;
		this.canvas = <HistoryCanvas>new fabric.Canvas(target);
		this.onStateUpdate = onStateUpdate;

		this.selectedEvent();

		this.addRect = this.addRect.bind(this);
		this.setActiveObject = this.setActiveObject.bind(this);
	}

	setScrollPoint(nextScrollPoint: ScrollPoint) {
		this.scrollPoint = nextScrollPoint;
	}

	didStateUpdate(nextState: ICanvasState) {
		if (this.canvas && this.canvas.isDrawingMode) {
			this.canvas.freeDrawingBrush.color = nextState.selectedFillColor;
			this.canvas.freeDrawingBrush.width = nextState.brushWidth;
		}

		this.onStateUpdate && this.onStateUpdate(nextState);
	}

	selectedEvent() {
		function handleSelect(obj: any) {
			obj.selected.forEach((o) => this.canvas.bringForward(o));
			this.setState({ ...this.state, selected: obj.selected });
		}

		this.canvas.on("selection:updated", handleSelect.bind(this));
		this.canvas.on("selection:created", handleSelect.bind(this));
	}

	addRect() {
		const rect = new fabric.Rect({
			width: 50,
			height: 50,
			...this.canvas.getCenter(),
			stroke: this.state.selectedStrokeColoe,
			fill: this.state.selectedFillColor,
		});

		this.canvas.add(rect);
		return rect;
	}

	deleteSelected() {
		if (this.getSelected()) {
			this.canvas.remove(...this.getSelected());
		}
	}

	drwaingModeOn() {
		this.canvas.isDrawingMode = true;
	}

	drwaingModeOff() {
		this.canvas.isDrawingMode = false;
	}

	downloadImage() {
		const { top, left } = this.scrollPoint;

		cropImage(this.resorceCanvas, left, top);
	}

	getImage() {
		return canvasImageToFileConverter(this.resorceCanvas, "jpeg");
	}

	getJson() {
		return this.canvas.toJSON();
	}

	addImage(img: HTMLImageElement, options?: { top?: number; left?: number; selectable?: boolean }) {
		const center = {
			left: this.canvas.getCenter().left - img.width / 2,
			top: this.canvas.getCenter().top - img.height / 2,
		};
		const option = options ? { ...center, ...options } : center;

		const image = new fabric.Image(img, {
			width: img.width,
			height: img.height,
			angle: 0,
			...option,
			filters: [
				new fabric.Image.filters.RemoveColor({
					color: "#ffffff",
					threshold: 0,
				}),
			],
		});

		this.canvas.add(image);

		return image;
	}

	getCenterByImg(img: HTMLImageElement) {
		const { left, top } = this.canvas.getCenter();

		return {
			left: left,
			top: top,
		};
	}

	undo() {
		if (this.undoHistoryLength) {
			this.canvas.undo();
		}
	}

	redo() {
		this.canvas.redo();
	}

	resetCanvas() {
		this.canvas.toResetHistory();
	}

	loadJsonCanvas(json, callback) {
		this.canvas = this.canvas.loadFromJSON(json, callback) as HistoryCanvas;
	}

	clearHistory() {
		this.canvas.clearHistory();
	}

	on(event, handler) {
		this.canvas.on(event, handler);
	}

	remove(object) {
		this.canvas.remove(object);
	}

	setActiveObject(object) {
		this.canvas.getObjects().forEach((obj, i) => {
			if (obj === object) {
				if (i !== 0) this.canvas.setActiveObject(object);
			}
		});

		const rect = this.addRect();
		this.canvas.remove(rect);
	}

	get undoHistoryLength() {
		return this.canvas.historyUndo.length;
	}

	get redoHistoryLength() {
		return this.canvas.historyRedo.length;
	}

	get width() {
		return this.canvas.width;
	}

	get height() {
		return this.canvas.height;
	}

	set width(width: number) {
		this.canvas.width = width;
	}

	set height(height: number) {
		this.canvas.height = height;
	}

	getSelected() {
		return this.state.selected;
	}
}

export default Canvas;
