import Canvas from "./Canvas";

class Options {
	private options;
	private canvas;

	constructor(options, canvas: Canvas, optionWrapper: HTMLDivElement) {
		this.canvas = canvas;
	}
}

export default Options;
