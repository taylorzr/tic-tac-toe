var readline = require("readline");
var Board = require("./js/Board");
var Intelligence = require("./js/Intelligence");
var TerminalView = require("./js/TerminalView");

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
  input.on("line", function playRound(line) { 
    this.board.mark("x", parseInt(line.trim()) - 1);
    this.board.mark("o", this.intel.bestCellFor("o"));
    input.close();
    this.play()
  }.bind(this));
}

Game.prototype.over = function() {
  return this.board.winner() || this.board.full();
}

game = new Game();
game.play();
