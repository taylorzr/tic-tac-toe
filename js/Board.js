function Board() {
  this.name = "Tic-Tac-Toe"; 
  this.cells = Array.apply(null, Array(9)).map(function(){ return null; });
  this.diagonal1 = [0, 4, 8];
  this.diagonal2 = [2, 4, 6];
}

Board.prototype.mark = function(symbol, cell) {
  this.cells[cell] = symbol;
}

Board.prototype.rows = function() {
  var rows = [];
  var rowLength = 3;
  for (var i = 0, length = this.cells.length; i < length; i += rowLength) {
    var row = this.cells.slice(i, i + rowLength);
    rows.push(row);
  }
  return rows
}

Board.prototype.columns = function() {
  var columns = [];
  var columnLength = 3;
  for (var i = 0, length = columnLength; i < length; i += 1) {
    var column = [this.cells[i], this.cells[i + columnLength], this.cells[i + (columnLength * 2)]];
    columns.push(column);
  }
  return columns;
}

Board.prototype.diagonals = function() {
  var diagonal1 = this.diagonal1.map(function(cellIndex) {
    return this.cells[cellIndex];
  }, this);
  var diagonal2 = this.diagonal2.map(function(cellIndex) {
    return this.cells[cellIndex];
  }, this);
  return [diagonal1, diagonal2];
}

Board.prototype.lines = function() {
  return this.rows().concat(this.columns(), this.diagonals());
}

Board.prototype.filledWith = function(symbol, line) {
  return line.every(function(value) {
    return value == symbol;
  });
}

Board.prototype.full = function() {
  return this.cells.every(function(cellValue) {
    return cellValue != null;
  });
}

Board.prototype.winner = function() {
  var symbol = null;
  debugger;
  this.lines().forEach(function(line) {
    if (this.filledWith("x", line)) {
      symbol = "x";
    } else if (this.filledWith("o", line)) {
      symbol = "o"
    }
  }, this);
  return symbol;
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
