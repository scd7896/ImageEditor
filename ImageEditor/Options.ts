import Canvas from "./Canvas";

class Options {
	private options: Array<string>;
	private canvas: Canvas;
	private optionWrapper: HTMLDivElement;
	private selectedColor: string;

	constructor(options, canvas: Canvas, optionWrapper: HTMLDivElement) {
		this.canvas = canvas;
		this.optionWrapper = optionWrapper;
		options.map((button) => {
			this[button]();
		});
	}

	createButton(title) {
		const button = document.createElement("button");
		button.textContent = title;
		this.optionWrapper.appendChild(button);
		return button;
	}

	download() {
		const button = this.createButton("다운로드");
	}

	upload() {
		const button = this.createButton("업로드");
	}

	rect() {
		const button = this.createButton("사각형");
		button.addEventListener("click", () => {
			this.canvas.addRect(this.selectedColor);
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
					obj.set("backgroundColor", input.value);
					obj.set("fill", input.value);
				});
			}
			this.selectedColor = input.value;
		});
		button.addEventListener("click", () => {
			input.click();
		});
	}
}

export default Options;
