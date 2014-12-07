var readline = require("readline");
var Board = require("./src/Board");
var Intelligence = require("./src/Intelligence");
var TerminalView = require("./src/TerminalView");

function Game(view) {
  this.board = new Board();
  this.intel = new Intelligence(this.board);
  this.view = view || new TerminalView(this.board);
}

Game.prototype.show = function() {
  console.log(this.view.render());
}

Game.prototype.play = function() {
  this.show();
  if (this.over()) process.exit(0);
  this.playRound() 
}

Game.prototype.playRound = function() {
  var input = readline.createInterface(process.stdin, process.stdout);
  input.setPrompt("Enter a cell to mark: ");
  input.prompt();
  var that = this;
  input.on("line", function(line) { 
    that.board.mark("x", parseInt(line.trim()) - 1);
    that.board.mark("o", that.intel.bestCellFor("o"));
    input.close();
    that.play()
  });
}

Game.prototype.over = function() {
  this.board.winner() || this.board.full();
}

game = new Game();
game.play();
