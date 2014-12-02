describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  describe("board", function() {
    it ("should have 9 cells", function() {
      expect(game.board.length).toEqual(9)
    });
  });

  describe("#mark", function() {
    it ("should mark a cell", function() {
      game.mark("x", 1);
      expect(game.board[0]).toEqual("x");
    });
  });

  describe("#rowForCellIndex", function() {
    it ("should return the row values for a given cell index", function() {
      game.mark("x", 1);
      game.mark("o", 2);
      game.mark("x", 3);
      expect(game.rowForCellIndex(0)).toEqual(["x", "o", "x"]);
    });
  });

  describe("#columnForCellIndex", function() {
    it ("should return the column values for a given cell index", function() {
      game.mark("x", 1);
      game.mark("o", 4);
      game.mark("x", 7);
      expect(game.columnForCellIndex(0)).toEqual(["x", "o", "x"]);
    });
  });
});
