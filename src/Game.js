function Game() {
  this.name = "Tic-Tac-Toe"; 
  this.board = Array.apply(null, Array(9)).map(function(){ return null; });
  this.diagonal1 = [0, 4, 8];
  this.diagonal2 = [2, 4, 6];
}

// module.exports = Game;

Game.prototype.show = function() {
  var printableBoard = this.board.map(function(cellValue) {
    return cellValue == null ? "-" : cellValue;
  });
  console.log(printableBoard.slice(0, 3));
  console.log(printableBoard.slice(3, 6));
  console.log(printableBoard.slice(6, 9));
}

Game.prototype.mark = function(symbol, cell) {
  this.board[cell - 1] = symbol; // 1 indexed
}

Game.prototype.bestCellFor = function(symbol) {
  var ratings = this.board.map(function(cellValue, cellIndex) {
    if (cellValue != null) return null;
    return this.openRatingFor(symbol, cellIndex) + this.blockRatingFor(symbol, cellIndex);
  }, this);
  return ratings.indexOf(Math.max.apply(null, ratings));
}

Game.prototype.openRatingFor = function(symbol, cellIndex) {
  return this.rowOpenFor(symbol, cellIndex) + this.columnOpenFor(symbol, cellIndex) + this.diagonalsOpenFor(symbol, cellIndex);
}

Game.prototype.blockRatingFor = function(symbol, cellIndex) {
  return this.rowBlockFor(symbol, cellIndex) + this.columnBlockFor(symbol, cellIndex) + this.diagonalsBlockFor(symbol, cellIndex);
}

Game.prototype.rowBlockFor = function(symbol, cellIndex) {
  var notAlreadyBlocked = this.rowForCell(cellIndex).every(function(cellValue){
    return cellValue != symbol;
  });
  var blockCount = this.rowForCell(cellIndex).reduce(function(count, cellValue) {
    if (cellValue != symbol && cellValue != null) count += 1;
    return count;
  }, 0);
  return notAlreadyBlocked ? blockCount : 0;
}

Game.prototype.columnBlockFor = function(symbol, cellIndex) {
  var notAlreadyBlocked = this.columnForCell(cellIndex).every(function(cellValue){
    return cellValue != symbol;
  });
  var blockCount = this.columnForCell(cellIndex).reduce(function(count, cellValue) {
    if (cellValue != symbol && cellValue != null) count += 1;
    return count;
  }, 0);
  return notAlreadyBlocked ? blockCount : 0;
}

Game.prototype.diagonalsBlockFor = function(symbol, cellIndex) {
  if (!this.cellOnDiagonal(cellIndex)) return 0; 
  
  var diagonalsValues = this.diagonalsForCell(cellIndex);
  return diagonalsValues.reduce(function(count, diagonalValues) {
    if (diagonalValues == null) return count;
    var notAlreadyBlocked = diagonalValues.every(function(cellValue){
      return cellValue != symbol;
    });
    var blocks = diagonalValues.some(function(cellValue) {
      return cellValue != symbol && cellValue != null;
    });
    if (notAlreadyBlocked && blocks) count += 1;
    return count;
  }, 0);
}

Game.prototype.rowOpenFor = function(symbol, cellIndex) {
  var open = this.rowForCell(cellIndex).every(function(cellValue) {
    return cellValue == symbol || cellValue == null; 
  }); 
  return open ? 1 : 0;
}

Game.prototype.columnOpenFor = function(symbol, cellIndex) {
  var open = this.columnForCell(cellIndex).every(function(cellValue) {
    return cellValue == symbol || cellValue == null;
  });
  return open ? 1 : 0;
}

Game.prototype.diagonalsOpenFor = function(symbol, cellIndex) {
  if (!this.cellOnDiagonal(cellIndex)) return 0; 
  
  var diagonalsValues = this.diagonalsForCell(cellIndex);
  return diagonalsValues.reduce(function(count, diagonalValues) {
    if (diagonalValues == null) return count;
    var diagonalOpen = diagonalValues.every(function(cellValue) {
      return cellValue == symbol || cellValue == null;
    });
    if (diagonalOpen) count += 1;
    return count;
  }, 0);
}

Game.prototype.rowForCell = function(cellIndex) {
  return this.board.filter(function(_, index) {
    return Math.floor(index / 3) == Math.floor(cellIndex / 3);
  });
}

Game.prototype.columnForCell = function(cellIndex) {
  return this.board.filter(function(_, index) {
    return index % 3 == cellIndex % 3;
  });
}

Game.prototype.diagonalsForCell = function(cellIndex) {
  if (!this.cellOnDiagonal(cellIndex)) return [null, null];
  
  var diagonalValues1 = null;
  if (this.diagonal1.indexOf(cellIndex) != -1) {
    diagonalValues1 = this.board.filter(function(_, index) {
      return this.diagonal1.indexOf(index) != -1;
    }, this);
  }

  var diagonalValues2 = null;
  if (this.diagonal2.indexOf(cellIndex) != -1) {
    diagonalValues2 = this.board.filter(function(_, index) {
      return this.diagonal2.indexOf(index) != -1; 
    }, this);
  }

  return [diagonalValues1, diagonalValues2];
}

Game.prototype.cellOnDiagonal = function(cellIndex) {
  return cellIndex % 2 == 0;
}
