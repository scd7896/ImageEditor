fabric.Canvas.prototype.toResetHistory = function() {
  let history = "{}";
  while (this.historyUndo.length) {
    history = this.historyUndo.pop();
  }

  this._loadHistory(history, "");
  this.historyRedo = [];
  this.historyUndo = [];
  this.historyNextState = history;
}