$(function() {
  var game = new Game();
  $("td").click(function() {
    var cell = this;
    game.playRound(cell)
  });

});
  
function Game() {
  this.board = new Board();
  this.intel = new Intelligence(this.board);
  this.x = '<i class="fa fa-5x fa-close"></i>';
  this.o = '<i class="fa fa-4x fa-bomb"></i>';
}

Game.prototype.playRound = function(cell) {
  this.board.mark("x", $(cell).data("cell-index"));
  $(cell).html(this.x);
  var o_cell = this.intel.bestCellFor("o");
  $("#" + o_cell).html(this.o);
  this.board.mark("o", o_cell);
}
