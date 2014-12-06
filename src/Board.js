function Board() {
  this.name = "Tic-Tac-Toe"; 
  this.cells = Array.apply(null, Array(9)).map(function(){ return null; });
  this.diagonal1 = [0, 4, 8];
  this.diagonal2 = [2, 4, 6];
}

Board.prototype.show = function() {
  var printableBoard = this.cells.map(function(cellValue) {
    return cellValue == null ? "-" : cellValue;
  });
  console.log(printableBoard.slice(0, 3));
  console.log(printableBoard.slice(3, 6));
  console.log(printableBoard.slice(6, 9));
}

Board.prototype.mark = function(symbol, cell) {
  this.cells[cell] = symbol;
}

Board.prototype.rowForCell = function(cellIndex) {
  return this.cells.filter(function(_, index) {
    return Math.floor(index / 3) == Math.floor(cellIndex / 3);
  });
}

Board.prototype.columnForCell = function(cellIndex) {
  return this.cells.filter(function(_, index) {
    return index % 3 == cellIndex % 3;
  });
}

Board.prototype.diagonalsForCell = function(cellIndex) {
  if (!this.cellOnDiagonal(cellIndex)) return [null, null];
  
  var diagonalValues1 = null;
  if (this.diagonal1.indexOf(cellIndex) != -1) {
    diagonalValues1 = this.cells.filter(function(_, index) {
      return this.diagonal1.indexOf(index) != -1;
    }, this);
  }

  var diagonalValues2 = null;
  if (this.diagonal2.indexOf(cellIndex) != -1) {
    diagonalValues2 = this.cells.filter(function(_, index) {
      return this.diagonal2.indexOf(index) != -1; 
    }, this);
  }

  return [diagonalValues1, diagonalValues2];
}

Board.prototype.cellOnDiagonal = function(cellIndex) {
  return cellIndex % 2 == 0;
}

module.exports = Board;
