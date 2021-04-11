import Canvas from "./Canvas";

class Options {
	private options: Array<string>;
	private canvas: Canvas;
	private optionWrapper: HTMLDivElement;
	private selectedColor: string;
	private selectedWidth: number;
	private mode: string;

	constructor(options, canvas: Canvas, optionWrapper: HTMLDivElement) {
		this.canvas = canvas;
		this.optionWrapper = optionWrapper;
		options.buttons.map((button) => {
			this[button]();
		});
	}

	createButton(title) {
		const button = document.createElement("button");
		button.textContent = title;
		this.optionWrapper.appendChild(button);
		return button;
	}

	optionInitSet() {
		this.canvas.toInitSet();
		this.mode = null;
	}

	download() {
		this.optionInitSet();
		const button = this.createButton("다운로드");
	}

	upload() {
		this.optionInitSet();
		const button = this.createButton("업로드");
	}

	rect() {
		const button = this.createButton("사각형");
		button.addEventListener("click", () => {
			this.optionInitSet();
			this.canvas.addRect(this.selectedColor);
		});
	}

	pen() {
		const button = this.createButton("펜");
		button.addEventListener("click", () => {
			if (this.mode !== "pen") {
				this.mode = "pen";
				this.canvas.drwaingModeOn(this.selectedColor, this.selectedWidth);
			} else {
				this.mode = null;
				this.canvas.drwaingModeOff();
			}
		});
	}

	color() {
		const input = document.createElement("input");
		const button = this.createButton("컬러선택");
		input.style.display = "none";
		input.type = "color";
		button.parentElement.appendChild(input);
		input.addEventListener("change", () => {
			const selected = this.canvas.getSelected();
			if (selected) {
				selected.map((obj) => {
					if (obj.type === "path") {
						obj.set("stroke", input.value);
					} else {
						obj.set("backgroundColor", input.value);
						obj.set("fill", input.value);
					}
				});
			}
			if (this.mode === "pen") {
				this.canvas.drwaingModeOn(input.value);
			}
			this.selectedColor = input.value;
		});
		button.addEventListener("click", () => {
			input.click();
		});
	}

	undo() {
		const button = this.createButton("뒤로");
		button.addEventListener("click", () => {
			this.canvas.undo();
		});
	}

	redo() {
		const button = this.createButton("앞으로");
		button.addEventListener("click", () => {
			this.canvas.redo();
		});
	}
}

export default Options;
