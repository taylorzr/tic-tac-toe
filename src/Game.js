function Game() {
  this.name = "Tic-Tac-Toe"; 
  this.board = new Array(9);
}

Game.prototype.mark = function(symbol, cell) {
  this.board[cell - 1] = symbol;
}

Game.prototype.rowForCellIndex = function(cellIndex) {
  return this.board.filter(function(_, index) {
    return Math.floor(index / 3) == Math.floor(cellIndex / 3);
  });
}

Game.prototype.columnForCellIndex = function(cellIndex) {
  return this.board.filter(function(_, index) {
    return index % 3 == cellIndex % 3;
  });
}
