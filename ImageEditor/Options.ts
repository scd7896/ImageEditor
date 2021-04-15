import Canvas from "./Canvas";
import OptionState from "./OptionState";

class Options extends OptionState {
	private canvas: Canvas;

	constructor(option, canvas: Canvas) {
		super();
		this.canvas = canvas;
	}

	optionInitSet() {
		this.canvas.toInitSet();
		this.mode = null;
	}

	rectClick() {
		this.optionInitSet();
		this.canvas.addRect(this.selectedColor);
	}

	clickPen() {
		if (this.mode !== "pen") {
			this.mode = "pen";
			this.canvas.drwaingModeOn(this.selectedColor, this.selectedWidth);
		} else {
			this.mode = null;
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
		if (this.mode === "pen") {
			this.canvas.drwaingModeOn(e.target.value);
		}
		this.selectedColor = e.target.value;
	}

	undoClick() {
		this.canvas.undo();
	}

	redoClick() {
		this.canvas.redo();
	}
}

export default Options;
