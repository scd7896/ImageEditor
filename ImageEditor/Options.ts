import Canvas from "./Canvas";
class Options {
	private canvas: Canvas;
	private option: any;

	constructor(option, canvas: Canvas) {
		this.canvas = canvas;
		this.option = option;
	}

	rectClick() {
		this.canvas.addRect();
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
			selectedColor: e.target.value,
		});
	}

	undoClick() {
		this.canvas.undo();
	}

	redoClick() {
		this.canvas.redo();
	}

	exportsClick() {
		const json = this.canvas.getJson();
		const blob = this.canvas.getImage();
		if (this.option.events.onExports) {
			this.option.events.onExports({ json, blob });
		}
	}

	resetButtonClick() {
		this.canvas.resetCanvas();
	}

	imageLoadClick() {}

	downLoadClick() {
		const blob = this.canvas.getImage();
		if (this.option.events.onDownLoad) {
			this.option.events.onDownLoad(blob);
		} else {
			const file = new File([blob], "test.png");
			const url = URL.createObjectURL(file);
			const a = document.createElement("a");
			a.download = file.name;
			a.href = url;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		}
	}
}

export default Options;
