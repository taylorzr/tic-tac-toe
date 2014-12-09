function WebView(board) {
  this.board = board;
  this.x = '<i class="fa fa-5x fa-close"></i>';
  this.o = '<i class="fa fa-4x fa-bomb"></i>';
}

WebView.prototype.render = function() {
  var boardHtml = "<tr>" +
    '<td id="0" data-cell-index="0">' + this.renderCell(this.board.cells[0]) + '</td>' +
    '<td id="1" data-cell-index="1">' + this.renderCell(this.board.cells[1]) + '</td>' +
    '<td id="2" data-cell-index="2">' + this.renderCell(this.board.cells[2]) + '</td>' +
  '<tr>' +
  '<tr>' +
    '<td id="3" data-cell-index="3">' + this.renderCell(this.board.cells[3]) + '</td>' +
    '<td id="4" data-cell-index="4">' + this.renderCell(this.board.cells[4]) + '</td>' +
    '<td id="5" data-cell-index="5">' + this.renderCell(this.board.cells[5]) + '</td>' +
  '<tr>' +
  '<tr>' +
    '<td id="6" data-cell-index="6">' + this.renderCell(this.board.cells[6]) + '</td>' +
    '<td id="7" data-cell-index="7">' + this.renderCell(this.board.cells[7]) + '</td>' +
    '<td id="8" data-cell-index="8">' + this.renderCell(this.board.cells[8]) + '</td>' +
  '</tr>;'
  return boardHtml;
}

WebView.prototype.renderCell = function(symbol) {
  if (symbol == "x") {
    return this.x;
  } else if (symbol == "o") {
    return this.o;
  } else {
    return "";
  }
}
