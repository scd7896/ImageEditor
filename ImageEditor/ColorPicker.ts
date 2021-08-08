import Canvas from "./Canvas";
import { colorList } from "./util/constant";
import { findTargetElementByType } from "./util/events";

class ColorPicker {
	canvas: Canvas;
	colorToggleButton: HTMLDivElement;
	colorPickerWrapper: HTMLDivElement;

	constructor(canvas: Canvas, toggleButtonWrapper: HTMLDivElement, canvasWrapper: HTMLDivElement) {
		this.canvas = canvas;

		const colorToggleButton = document.createElement("div");
		colorToggleButton.classList.add("colorToggleButton");
		colorToggleButton.style.background = this.canvas.state.selectedFillColor;
		this.colorToggleButton = colorToggleButton;
		colorToggleButton.addEventListener("click", () => {
			this.onToggleColorPicker(this.colorPickerWrapper.style.display === "none");
		});

		const colorPickerWrapper = document.createElement("div");
		colorPickerWrapper.classList.add("colorPickerWrapper");
		colorPickerWrapper.style.display = "none";
		this.colorPickerWrapper = colorPickerWrapper;

		const colorWrapper = document.createElement("div");
		colorWrapper.classList.add("colorWrapper");
		this.createColors(colorWrapper);
		colorWrapper.addEventListener("click", (e) => {
			const target = findTargetElementByType(e.target as HTMLDivElement, "button");
			if (target) {
				this.colorToggleButton.style.background = target.style.background;
				this.canvas.setState({
					selectedFillColor: target.style.background,
				});
				const parent = target.parentElement;
				for (let i = 0; i < parent.children.length; i++) {
					const children = parent.children.item(i);
					if (children) children.classList.remove("selected");
				}
				target.classList.add("selected");
			}
		});

		const closeWrapper = document.createElement("div");

		colorPickerWrapper.appendChild(closeWrapper);
		colorPickerWrapper.appendChild(colorWrapper);
		canvasWrapper.appendChild(colorPickerWrapper);
		toggleButtonWrapper.appendChild(colorToggleButton);
	}

	createColors(wrapper: HTMLDivElement) {
		colorList.map((color) => {
			const colorButton = document.createElement("div");
			colorButton.classList.add("colorButton");
			if (color === "ffffff") {
				colorButton.classList.add("whiteBorder");
			}
			colorButton.style.background = `#${color}`;
			colorButton.dataset.type = "button";
			colorButton.dataset.color = color;
			wrapper.appendChild(colorButton);
		});
	}

	onToggleColorPicker(state: boolean) {
		if (state) {
			this.colorPickerWrapper.style.display = "block";
		} else {
			this.colorPickerWrapper.style.display = "none";
		}
	}
}

export default ColorPicker;
