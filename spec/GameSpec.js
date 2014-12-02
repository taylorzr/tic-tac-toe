describe("Game", function() {
  var game;
  var xox;

  beforeEach(function() {
    game = new Game();
    xox = ["x", "o", "x"];
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

  describe("#diagonalsForCellIndex", function() {
    it ("should return the \\ diagonal values for a \\ diagonal cell index", function() {
      game.mark("x", 1);
      game.mark("o", 5);
      game.mark("x", 9);
      expect(game.diagonalsForCellIndex(0)).toEqual([xox, []]);
    });

    it ("should return the / diagonal values for a / diagonal cell index", function() {
      game.mark("x", 3);
      game.mark("o", 5);
      game.mark("x", 7);
      expect(game.diagonalsForCellIndex(2)).toEqual([[], xox]);
    })

    it ("should return both the \\ and / diagonal values for the middle index", function() {
      game.mark("x", 1);
      game.mark("o", 5);
      game.mark("x", 9);
      game.mark("x", 3);
      game.mark("o", 5);
      game.mark("x", 7);
      expect(game.diagonalsForCellIndex(4)).toEqual([xox, xox]);
    });

    it ("should return two empty arrays for a non-diagonal cell index", function() {
      expect(game.diagonalsForCellIndex(1)).toEqual([[], []]);
    });
  });
});
