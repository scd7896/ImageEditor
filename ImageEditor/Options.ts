import Canvas from "./Canvas";
class Options {
	private canvas: Canvas;
	private option: IOption;
	private rootElement: HTMLDivElement;

	constructor(option, canvas: Canvas, rootElement: HTMLDivElement) {
		this.canvas = canvas;
		this.option = option;
		this.rootElement = rootElement;
	}

	shapeClick() {
		this.canvas.setState({
			mode: "shape",
			viewSelectColorPicker: false,
		});
	}

	clickPen() {
		if (this.canvas.state.mode !== "pen") {
			this.canvas.setState({ mode: "pen", viewSelectColorPicker: false });
			this.canvas.drwaingModeOn();
		} else {
			this.canvas.setState({ mode: "normal", viewSelectColorPicker: false });
			this.canvas.drwaingModeOff();
		}
	}

	undoClick() {
		this.canvas.undo();
	}

	redoClick() {
		this.canvas.redo();
	}

	exportsClick() {
		const blob = this.canvas.getImage();
		if (this.option.events.onDownLoad) {
			this.option.events.onDownLoad(blob);
		}
	}

	resetButtonClick() {
		this.canvas.resetCanvas();
	}

	imageLoadClick() {}

	downLoadClick() {
		const blob = this.canvas.getImage();
		if (this.option.events?.onDownLoad) {
			this.option.events.onDownLoad(blob);
		} else {
			this.canvas.downloadImage();
		}
	}

	deleteClick() {
		this.canvas.deleteSelected();
	}

	toggleStickerShow() {
		this.canvas.setState({
			mode: "sticker",
		});
	}

	closeClick() {
		if (this.option.events.onCancel) {
			this.option.events.onCancel();
		} else {
			this.rootElement.parentNode.removeChild(this.rootElement);
		}
	}
}

export default Options;
