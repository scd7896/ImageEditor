import { ICanvasState } from "../types/CanvasState";
import { DEFAULT_COLOR, DEFAULT_WIDTH } from "./util/constant";

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
		this.setState({
			brushWidth: this.state.brushWidth + 1,
		});
	}

	brushWidthDown() {
		this.setState({
			brushWidth: this.state.brushWidth - 1,
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
