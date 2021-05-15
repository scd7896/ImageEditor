import Options from "./Options";

export default class ToolButtons {
	private optionWrapper: HTMLDivElement;
	private option: Options;
	constructor(option: Options, optionWrapper: HTMLDivElement, buttons: string[]) {
		this.optionWrapper = optionWrapper;
		this.option = option;
		this.optionWrapper = optionWrapper;
		buttons.map((button) => {
			this[button]();
		});
	}

	createButton(title) {
		const button = document.createElement("button");
		button.textContent = title;
		this.optionWrapper.appendChild(button);
		return button;
	}

	pen() {
		const button = this.createButton("펜");
		button.addEventListener("click", this.option.clickPen.bind(this.option));
	}

	color() {
		const input = document.createElement("input");
		const button = this.createButton("컬러선택");
		input.style.display = "none";
		input.type = "color";
		button.parentElement.appendChild(input);
		input.addEventListener("change", this.option.colorChange.bind(this.option));

		button.addEventListener("click", () => {
			input.click();
		});
	}

	undo() {
		const button = this.createButton("뒤로");
		button.addEventListener("click", this.option.undoClick.bind(this.option));
	}

	redo() {
		const button = this.createButton("앞으로");
		button.addEventListener("click", this.option.redoClick.bind(this.option));
	}

	download() {
		const button = this.createButton("다운로드");
		button.addEventListener("click", this.option.downLoadClick.bind(this.option));
	}

	upload() {
		const button = this.createButton("업로드");
	}

	rect() {
		const button = this.createButton("사각형");
		button.addEventListener("click", this.option.rectClick.bind(this.option));
	}
}
