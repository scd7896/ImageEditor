import * as icons from "../icons";
import { Mode } from "../types/CanvasState";
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

	rerenderOptionTools(mode: Mode, selected: boolean) {
		const button = document.createElement("button");
		button.classList.add("option-button");
		const iconName = `${mode}SVG`;
		if (icons[iconName]) {
			const text = icons[iconName](selected);
			button.innerHTML = text;
		}
		if (selected) button.classList.add("selected");
		const span = document.createElement("span");
		span.classList.add("button-title");
		span.textContent = mode;
		button.appendChild(span);
		button.dataset.type = "bottomMenu";
		button.dataset.mode = mode;

		this.optionWrapper.appendChild(button);
		return button;
	}

	createButton(title) {
		const button = document.createElement("button");
		button.classList.add("option-button");
		const iconName = `${title}SVG`;
		if (icons[iconName]) {
			const text = icons[iconName](false);
			button.innerHTML = text;
		}

		switch (title) {
			case "shape":
			case "pen":
			case "sticker":
				const span = document.createElement("span");
				span.classList.add("button-title");
				span.textContent = title;
				button.appendChild(span);
				button.dataset.type = "bottomMenu";
				button.dataset.mode = title;
		}

		this.optionWrapper.appendChild(button);
		return button;
	}

	pen() {
		this.createButton("pen");
	}

	undo() {
		const button = this.createButton("undo");
		button.addEventListener("click", this.option.undoClick.bind(this.option));
	}

	redo() {
		const button = this.createButton("redo");
		button.addEventListener("click", this.option.redoClick.bind(this.option));
	}

	download() {
		const button = this.createButton("download");
		button.addEventListener("click", this.option.downLoadClick.bind(this.option));
	}

	upload() {
		const button = this.createButton("업로드");
	}

	shape() {
		this.createButton("shape");
	}

	exports() {
		const button = this.createButton("내보내기");
		button.addEventListener("click", this.option.exportsClick.bind(this.option));
	}

	reset() {
		const button = this.createButton("reset");
		button.addEventListener("click", this.option.resetButtonClick.bind(this.option));
	}

	remove() {
		const button = this.createButton("remove");
		button.addEventListener("click", this.option.deleteClick.bind(this.option));
	}

	sticker() {
		this.createButton("sticker");
	}

	close() {
		const button = this.createButton("close");
		button.addEventListener("click", this.option.closeClick.bind(this.option));
	}
}
