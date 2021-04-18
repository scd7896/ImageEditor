import { ICanvasState } from "../types/CanvasState";
import { DEFAULT_COLOR, DEFAULT_WIDTH } from "./util/constant";

const MAX_BRUSH_WIDTH = 16;
const MIN_BRUSH_WIDTH = 0;
abstract class CanvasState {
	public state: ICanvasState;

	constructor() {
		this.setState({
			selectedColor: DEFAULT_COLOR,
			selectedWidth: DEFAULT_WIDTH,
			brushWidth: DEFAULT_WIDTH,
			mode: "normal",
			selected: null,
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

		if (this.didStateUpdate) {
			this.didStateUpdate(this.state);
		}
	}

	abstract didStateUpdate(args: ICanvasState): void;
}

export default CanvasState;
