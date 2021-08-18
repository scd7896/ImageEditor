import * as icons from "../icons";
import { ICanvasState, IObserverState, Mode } from "../types/CanvasState";
import Options from "./Options";

export default class ToolButtons implements IObserverState {
	private optionWrapper: HTMLDivElement;
	private option: Options;
	private buttons: string[];
	private isHead?: boolean;
	constructor(
		option: Options,
		optionWrapper: HTMLDivElement,
		buttons: string[] = ["rect", "color", "pen", "undo", "redo", "download", "reset", "remove", "sticker"],
		isHead?: boolean
	) {
		this.isHead = isHead;
		this.buttons = buttons;
		this.optionWrapper = optionWrapper;
		this.option = option;
		this.optionWrapper = optionWrapper;
		buttons.map((button) => {
			this[button]();
		});
	}

	onStateUpdate(nextState: ICanvasState) {
		if (this.isHead) {
			while (this.optionWrapper.childNodes.length) {
				this.optionWrapper.childNodes.item(0).remove();
			}
			this.buttons.map((button) => {
				switch (button) {
					case "remove": {
						this[button](nextState.canDelete);
						break;
					}
					case "undo": {
						this[button](nextState.canUndo);
						break;
					}
					case "redo": {
						this[button](nextState.canRedo);
						break;
					}
					default: {
						this[button]();
					}
				}
			});
		}
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

	createButton(title, isSelected?: boolean) {
		const button = document.createElement("button");
		button.classList.add("option-button");
		button.classList.add(title);
		const iconName = `${title}SVG`;

		if (icons[iconName]) {
			const text = icons[iconName](isSelected);

			button.innerHTML = text;
		}

		switch (title) {
			case "shape":
			case "pen":
			case "sticker":
				const span = document.createElement("span");
				span.classList.add("button-title");
				span.classList.add(title);
				span.textContent = title;
				button.appendChild(span);
				button.dataset.type = "bottomMenu";
				button.dataset.mode = title;
		}

		return button;
	}

	pen() {
		const button = this.createButton("pen");
		this.optionWrapper.appendChild(button);
	}

	undo(isSelected?: boolean) {
		const button = this.createButton("undo", isSelected);
		this.optionWrapper.appendChild(button);
		button.addEventListener("click", this.option.undoClick.bind(this.option));
	}

	redo(isSelected?: boolean) {
		const button = this.createButton("redo", isSelected);
		this.optionWrapper.appendChild(button);
		button.addEventListener("click", this.option.redoClick.bind(this.option));
	}

	done() {
		const button = this.createButton("done");
		this.optionWrapper.appendChild(button);
		button.addEventListener("click", this.option.downLoadClick.bind(this.option));
	}

	upload() {
		const button = this.createButton("업로드");
		this.optionWrapper.appendChild(button);
	}

	shape() {
		const button = this.createButton("shape");
		this.optionWrapper.appendChild(button);
	}

	exports() {
		const button = this.createButton("내보내기");
		this.optionWrapper.appendChild(button);
		button.addEventListener("click", this.option.exportsClick.bind(this.option));
	}

	reset() {
		const button = this.createButton("reset");
		this.optionWrapper.appendChild(button);
		button.addEventListener("click", this.option.resetButtonClick.bind(this.option));
	}

	remove(isSelected?: boolean) {
		const button = this.createButton("remove", isSelected);
		this.optionWrapper.appendChild(button);
		button.addEventListener("click", this.option.deleteClick.bind(this.option));
	}

	sticker() {
		const button = this.createButton("sticker");
		this.optionWrapper.appendChild(button);
	}

	close() {
		const button = this.createButton("close");
		this.optionWrapper.appendChild(button);
		button.addEventListener("click", this.option.closeClick.bind(this.option));
	}
}
