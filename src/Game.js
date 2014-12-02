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

Game.prototype.diagonalsForCellIndex = function(cellIndex) {
  // cellIndex isn't on a diagonal if the index is odd
  if (cellIndex % 2 == 1) return [[], []];
  
  var diagonalValues1 = [];
  var diagonalIndexes1 = [0, 4, 8];
  if (diagonalIndexes1.indexOf(cellIndex) != -1) {
    diagonalValues1 = this.board.filter(function(_, index) {
      return [0, 4, 8].indexOf(index) != -1;
    });
  }

  var diagonalValues2 = [];
  var diagonalIndexes2 = [2, 4, 6];
  if (diagonalIndexes2.indexOf(cellIndex) != -1) {
    diagonalValues2 = this.board.filter(function(_, index) {
      return diagonalIndexes2.indexOf(index) != -1; 
    });
  }

  return [diagonalValues1, diagonalValues2];
}
