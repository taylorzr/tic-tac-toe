$(function() {
  var game = new Game();
  $("#board").html(game.view.render());
  $("#board").on("click", "td", function() {
    var cell = this;
    game.playRound(cell)
  });

});
  
function Game(view) {
  this.board = new Board();
  this.intel = new Intelligence(this.board);
  this.view = view || new WebView(this.board);
}

Game.prototype.playRound = function(cell) {
  this.board.mark("x", $(cell).data("cell-index"));
  this.board.mark("o", this.intel.bestCellFor("o"));
  $("#board").html(this.view.render());
}
