function Game(view) {
}

Game.prototype.show = function() {
  $("#board").html(this.view.render());
}

Game.prototype.reset = function() {
  this.board = new Board();
  this.intel = new Intelligence(this.board);
  this.view = new WebView(this.board);
  this.show();
}

Game.prototype.playRound = function(cellIndex) {
  this.board.mark("x", cellIndex);
  this.board.mark("o", this.intel.bestCellFor("o"));
  this.show();
  if (this.over()) this.end();
}

Game.prototype.over = function() {
  return this.board.full() || this.board.winner();
}

Game.prototype.end = function() {
  var winner_with_message = {
    "x": "You win! Dave, this conversation can serve no purpose anymore. Goodbye.",
    "o": "You lose! This mission is too important for me to allow you to jeopardize it.",
    null: "We've tied, thank you for a very enjoyable game."
  }
  alert(winner_with_message[this.board.winner()]);
  this.reset();
}

$(function() {
  var game = new Game();
  game.reset();
  $("#board").on("click", "td", function() {
    var cellIndex = $(this).data("cell-index");
    game.playRound(cellIndex)
  });

});
