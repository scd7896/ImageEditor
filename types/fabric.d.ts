import "fabric";
import fabric = require("fabric/fabric-impl");

export class HistoryCanvas extends fabric.Canvas {
	undo(callback?: Function): void;
	redo(callback?: Function): void;
	clearHistory(): void;
	offHistory(): void;
	onHistory(): void;
	historyRedo: string[];
	historyUndo: string[];
	_historyInit(): void;
	_loadHistory(history: string, event: string): void;
	historyNextState: string;
}
