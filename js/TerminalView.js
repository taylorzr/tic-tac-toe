function TerminalView(board) {
  this.board = board
  this.lineSeperator = "\n---------\n";
}

TerminalView.prototype.render = function() {
  symbols = this.renderSymbols(this.board.cells);
  rows = this.renderRows(symbols);
  return rows.join(this.lineSeperator);
}

TerminalView.prototype.renderSymbols = function(cells) {
  return cells.map(function(cellValue, cellIndex) {
    return (cellValue == null) ? (cellIndex + 1).toString() : cellValue;
  });
}

TerminalView.prototype.renderRows = function(symbols) {
  var rows = [];
  var rowLength = 3;
  for (var i = 0, length = symbols.length; i < length; i += rowLength){
    var row = symbols.slice(i, i + rowLength).join(" | ");
    rows.push(row);
  }
  return rows
}

module.exports = TerminalView;
