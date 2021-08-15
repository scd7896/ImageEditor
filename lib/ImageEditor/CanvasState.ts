import { ICanvasState, IObserverState } from "../types/CanvasState";
import { DEFAULT_COLOR, DEFAULT_WIDTH } from "./util/constant";

const MAX_BRUSH_WIDTH = 16;
const MIN_BRUSH_WIDTH = 0;
abstract class CanvasState {
	public state: ICanvasState;
	private listners: IObserverState[];

	constructor() {
		this.listners = [];
		this.setState({
			selectedFillColor: DEFAULT_COLOR,
			brushWidth: DEFAULT_WIDTH,
			mode: "normal",
			selected: null,
			viewSelectColorPicker: false,
		});
	}

	brushWidthUp() {
		const nextBrushWidth = this.state.brushWidth === MAX_BRUSH_WIDTH ? MAX_BRUSH_WIDTH : this.state.brushWidth + 1;
		this.setState({
			brushWidth: nextBrushWidth,
		});
	}

	brushWidthDown() {
		const nextBrushWidth = this.state.brushWidth === MIN_BRUSH_WIDTH ? MIN_BRUSH_WIDTH : this.state.brushWidth - 1;

		this.setState({
			brushWidth: nextBrushWidth,
		});
	}

	setState(args: ICanvasState) {
		this.state = {
			...this.state,
			...args,
		};

		this.listners.map((listener) => listener.onStateUpdate(this.state));

		if (this.didStateUpdate) {
			this.didStateUpdate(this.state);
		}
	}

	observe(listener: IObserverState) {
		this.listners.push(listener);
	}

	unobserve(listener: IObserverState) {
		this.listners = this.listners.filter((prev) => prev !== listener);
	}

	abstract didStateUpdate(args: ICanvasState): void;
}

export default CanvasState;
