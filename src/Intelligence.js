function Intelligence(board) {
  this.board = board;
}

Intelligence.prototype.bestCellFor = function(symbol) {
  debugger;
  var ratings = this.board.cells.map(function(cellValue, cellIndex) {
    if (cellValue != null) return null;
    return this.openRatingFor(symbol, cellIndex) + this.blockRatingFor(symbol, cellIndex);
  }, this);
  return ratings.indexOf(Math.max.apply(null, ratings));
}

Intelligence.prototype.openRatingFor = function(symbol, cellIndex) {
  return this.rowOpenFor(symbol, cellIndex) + this.columnOpenFor(symbol, cellIndex) + this.diagonalsOpenFor(symbol, cellIndex);
}

Intelligence.prototype.blockRatingFor = function(symbol, cellIndex) {
  return this.rowBlockFor(symbol, cellIndex) + this.columnBlockFor(symbol, cellIndex) + this.diagonalsBlockFor(symbol, cellIndex);
}

Intelligence.prototype.lineBlockFor = function(symbol, lineValues) {
  var notAlreadyBlocked = lineValues.every(function(cellValue){
    return cellValue != symbol;
  });
  var blockCount = lineValues.reduce(function(count, cellValue) {
    if (cellValue != symbol && cellValue != null) count += 1;
    return count;
  }, 0);
  return notAlreadyBlocked ? blockCount : 0;
}

Intelligence.prototype.rowBlockFor = function(symbol, cellIndex) {
  var rowValues = this.board.rowForCell(cellIndex);
  return this.lineBlockFor(symbol, rowValues);
}

Intelligence.prototype.columnBlockFor = function(symbol, cellIndex) {
  var columnValues = this.board.columnForCell(cellIndex);
  return this.lineBlockFor(symbol, columnValues);
}

Intelligence.prototype.diagonalsBlockFor = function(symbol, cellIndex) {
  if (!this.board.cellOnDiagonal(cellIndex)) return 0; 
  
  var diagonalsValues = this.board.diagonalsForCell(cellIndex);
  var that = this;
  return diagonalsValues.reduce(function(count, diagonalValues) {
    if (diagonalValues == null) return count;
    count += that.lineBlockFor(symbol, diagonalValues);
    return count;
  }, 0);
}

Intelligence.prototype.lineBlockFor = function(symbol, lineValues) {
  var notAlreadyBlocked = lineValues.every(function(cellValue){
    return cellValue != symbol;
  });
  var blockCount = lineValues.reduce(function(count, cellValue) {
    if (cellValue != symbol && cellValue != null) count += 1;
    return count;
  }, 0);
  return notAlreadyBlocked ? blockCount : 0;
}

Intelligence.prototype.rowOpenFor = function(symbol, cellIndex) {
  var rowValues = this.board.rowForCell(cellIndex);
  debugger;
  return this.lineOpenFor(symbol, rowValues);
}

Intelligence.prototype.columnOpenFor = function(symbol, cellIndex) {
  var columnValues = this.board.columnForCell(cellIndex);
  return this.lineOpenFor(symbol, columnValues);
}

Intelligence.prototype.diagonalsOpenFor = function(symbol, cellIndex) {
  if (!this.board.cellOnDiagonal(cellIndex)) return 0; 
  
  var diagonalsValues = this.board.diagonalsForCell(cellIndex);
  var that = this;
  return diagonalsValues.reduce(function(count, diagonalValues) {
    if (diagonalValues == null) return count;
    count += that.lineOpenFor(symbol, diagonalValues);
    return count;
  }, 0);
}

Intelligence.prototype.lineOpenFor = function(symbol, lineValues) {
  var lineOpen = lineValues.every(function(cellValue) {
    return cellValue == symbol || cellValue == null;
  });
  var symbolCount = lineValues.reduce(function(count, cellValue) {
    if (cellValue == symbol) count += 1;
    return count;
  }, 0); 
  return lineOpen ? (symbolCount || 1) : 0;
}

module.exports = Intelligence;
