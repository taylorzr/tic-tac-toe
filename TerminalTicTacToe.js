var readline = require("readline");
var Board = require("./js/Board");
var Intelligence = require("./js/Intelligence");
var TerminalView = require("./js/TerminalView");

function Game() {
  this.board = new Board();
  this.intel = new Intelligence(this.board);
  this.view = new TerminalView(this.board);
}

Game.prototype.show = function() {
  console.log(this.view.render());
}

Game.prototype.play = function() {
  this.show();
  if (this.over()) this.end();
  this.playRound() 
}

Game.prototype.playRound = function() {
  var input = readline.createInterface(process.stdin, process.stdout);
  input.setPrompt("Enter a cell to mark: ");
  input.prompt();
  input.on("line", function (line) { 
    input.close();
    var cellIndex = parseInt(line.trim()) - 1;
    if (this.board.cells[cellIndex]) {
      this.cellTaken();
      this.playRound();
    } else {
      this.board.mark("x", parseInt(line.trim()) - 1);
      this.board.mark("o", this.intel.bestCellFor("o"));
      this.play()
    }
  }.bind(this));
}

Game.prototype.over = function() {
  return this.board.winner() || this.board.full();
}

Game.prototype.end = function() {
  var winner_with_message = {
    "x": "You win! Dave, this conversation can serve no purpose anymore. Goodbye.",
    "o": "You lose! This mission is too important for me to allow you to jeopardize it.",
    null: "We've tied, thank you for a very enjoyable game."
  }
  console.log(winner_with_message[this.board.winner()]);
  process.exit(0);
}

Game.prototype.cellTaken = function() {
  console.log("Error: that cell is already taken, try again.");
}

game = new Game();
game.play();
