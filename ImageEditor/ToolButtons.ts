import Options from "./Options";

export default class ToolButtons {
	private optionWrapper: HTMLDivElement;
	private option: Options;
	constructor(
		option: Options,
		optionWrapper: HTMLDivElement,
		buttons: string[] = ["rect", "color", "pen", "undo", "redo", "download", "reset", "remove", "sticker"]
	) {
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
		const button = this.createButton("");
		input.style.display = "none";
		input.type = "color";
		input.defaultValue = "#000000";
		button.style.background = "#000000";
		button.style.width = "16px";
		button.style.height = "16px";
		button.parentElement.appendChild(input);
		input.addEventListener("change", (e: any) => {
			this.option.colorChange.call(this.option, e);
			button.style.background = e.target.value;
		});

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

	exports() {
		const button = this.createButton("내보내기");
		button.addEventListener("click", this.option.exportsClick.bind(this.option));
	}

	reset() {
		const button = this.createButton("리셋하기");
		button.addEventListener("click", this.option.resetButtonClick.bind(this.option));
	}

	remove() {
		const button = this.createButton("삭제하기");
		button.addEventListener("click", this.option.deleteClick.bind(this.option));
	}

	sticker() {
		const button = this.createButton("스티커");
		button.addEventListener("click", this.option.stickerOn.bind(this.option));
	}
}
