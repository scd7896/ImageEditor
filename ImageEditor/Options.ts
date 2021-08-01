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
			showShapeMode: !this.canvas.state.showShapeMode,
		});
	}

	clickPen() {
		if (this.canvas.state.mode !== "pen") {
			this.canvas.setState({ mode: "pen" });
			this.canvas.drwaingModeOn();
		} else {
			this.canvas.setState({ mode: "normal" });
			this.canvas.drwaingModeOff();
		}
	}

	colorChange(e) {
		const selected = this.canvas.getSelected();
		if (selected) {
			selected.map((obj) => {
				if (obj.type === "path") {
					obj.set("stroke", e.target.value);
				} else {
					obj.set("backgroundColor", e.target.value);
					obj.set("fill", e.target.value);
				}
			});
		}
		if (this.canvas.state.mode === "pen") {
			this.canvas.drwaingModeOn();
		}
		this.canvas.setState({
			selectedFillColor: e.target.value,
		});
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
			showStickerMode: !this.canvas.state.showStickerMode,
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
