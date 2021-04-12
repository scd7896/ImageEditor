import fabric = require("fabric/fabric-impl");

export class HistoryCanvas extends fabric.Canvas {
	undo(callback?: Function): void;
	redo(callback?: Function): void;
	clearHistory(): void;
	offHistory(): void;
	onHistory(): void;
	historyRedo: string[];
	historyUndo: string[];
}
