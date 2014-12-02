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

  describe("#bestCellFor", function() {
    it ("should return the middle cell if the board is empty", function() {
      expect(game.bestCellFor("x")).toEqual(4);
    });
  });

  describe("#rowOpenFor", function() {
    it ("should return true when the row has no opponent values", function() {
      game.mark("x", 3);
      expect(game.rowOpenFor("x", 0)).toBeTruthy();
    });

    it ("should return false when the row has opponent values", function() {
      game.mark("o", 3);
      expect(game.rowOpenFor("x", 0)).toBeFalsy();
    });
  });

  describe("#columnOpenFor", function() {
    it ("should return true when the column has no opponent values", function() {
      game.mark("x", 7);
      expect(game.columnOpenFor("x", 0)).toBeTruthy();
    });

    it ("should return false when the column has opponent values", function() {
      game.mark("o", 7);
      expect(game.columnOpenFor("x", 0)).toBeFalsy();
    });
  });

  describe("#diagonalsOpenFor", function() {
    it ("should return 2 when the diagonals have no opponent values", function() {
      game.mark("x", 5);
      expect(game.diagonalsOpenFor("x", 4)).toEqual(2);
    });

    it ("should return 1 when a diagonal has 1 opponent values", function() {
      game.mark("o", 7);
      expect(game.diagonalsOpenFor("x", 4)).toEqual(1);
    });

    it ("should return 0 when the cell isn't on a diagonal", function() {
      game.mark("x", 2);
      expect(game.diagonalsOpenFor("x", 1)).toEqual(0);
    });
  });

  describe("#rowForCell", function() {
    it ("should return the row values for a given cell index", function() {
      game.mark("x", 1);
      game.mark("o", 2);
      game.mark("x", 3);
      expect(game.rowForCell(0)).toEqual(["x", "o", "x"]);
    });
  });

  describe("#columnForCell", function() {
    it ("should return the column values for a given cell index", function() {
      game.mark("x", 1);
      game.mark("o", 4);
      game.mark("x", 7);
      expect(game.columnForCell(0)).toEqual(["x", "o", "x"]);
    });
  });

  describe("#diagonalsForCell", function() {
    it ("should return the \\ diagonal values for a \\ diagonal cell index", function() {
      game.mark("x", 1);
      game.mark("o", 5);
      game.mark("x", 9);
      expect(game.diagonalsForCell(0)).toEqual([xox, null]);
    });

    it ("should return the / diagonal values for a / diagonal cell index", function() {
      game.mark("x", 3);
      game.mark("o", 5);
      game.mark("x", 7);
      expect(game.diagonalsForCell(2)).toEqual([null, xox]);
    })

    it ("should return both the \\ and / diagonal values for the middle index", function() {
      game.mark("x", 1);
      game.mark("o", 5);
      game.mark("x", 9);
      game.mark("x", 3);
      game.mark("o", 5);
      game.mark("x", 7);
      expect(game.diagonalsForCell(4)).toEqual([xox, xox]);
    });

    it ("should return two nulls for a non-diagonal cell index", function() {
      expect(game.diagonalsForCell(1)).toEqual([null, null]);
    });
  });
});
