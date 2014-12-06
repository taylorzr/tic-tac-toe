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
      game.mark("x", 0);
      expect(game.board[0]).toEqual("x");
    });
  });

  describe("#bestCellFor", function() {
    it ("should return the middle cell if the board is empty", function() {
      expect(game.bestCellFor("x")).toEqual(4);
    });

    it ("should return the cell that wins the game", function() {
      game.mark("x", 0);
      game.mark("x", 1);
      expect(game.bestCellFor("x")).toEqual(2);
    });

    it ("should return the cell that blocks losing the game", function() {
      game.mark("o", 0);
      game.mark("o", 1);
      expect(game.bestCellFor("x")).toEqual(2);
    });

    it ("should return the cell that provides the greatest possiblilty for winning, and the least possibility for losing", function() {
      game.mark("x", 0);
      game.mark("o", 4);
      game.mark("x", 8);
      expect(game.bestCellFor("x")).toEqual(2);
    });
  });

  describe("#openRatingFor", function() {
    it ("should return 4 for the center cell on an empty board", function() {
      expect(game.openRatingFor("x", 4)).toEqual(4);
    });

    it ("should return 0 for the center cell full blocked", function() {
      game.mark("o", 3);
      game.mark("o", 7);
      game.mark("o", 0);
      game.mark("o", 2);
      expect(game.openRatingFor("x", 4)).toEqual(0);
    });
  });

  describe("#blockRatingFor", function() {
    it ("should return 4 for the center cell blocking horizontal, vertical and diagonals", function() {
      game.mark("o", 3);
      game.mark("o", 7);
      game.mark("o", 0);
      game.mark("o", 2);
      expect(game.blockRatingFor("x", 4)).toEqual(4);
    });

    it ("should return 0 for an empty board", function() {
      expect(game.blockRatingFor("x", 4)).toEqual(0);
    });
  });

  describe("#rowBlockFor", function() {
    it ("should return 2 when the row has 2 opponent values", function() {
      game.mark("o", 1);
      game.mark("o", 2);
      expect(game.rowBlockFor("x", 0)).toEqual(2);
    });
    
    it ("should return 1 when the row has 1 opponent value", function() {
      game.mark("o", 2);
      expect(game.rowBlockFor("x", 0)).toEqual(1);
    });

    it ("should return 0 when the row has no opponent values", function() {
      expect(game.rowBlockFor("x", 0)).toEqual(0);
    });

    it ("should return 0 when the row has an opponent value, but it is already blocked", function() {
      game.mark("o", 1);
      game.mark("x", 2);
      expect(game.rowBlockFor("x", 0)).toEqual(0);
    });
  });

  describe("#columnBlockFor", function() {
    it ("should return 2 when the column has 2 opponent values", function() {
      game.mark("o", 3);
      game.mark("o", 6);
      expect(game.columnBlockFor("x", 0)).toEqual(2);
    });

    it ("should return 1 when the column has 1 opponent value", function() {
      game.mark("o", 6);
      expect(game.columnBlockFor("x", 0)).toEqual(1);
    });

    it ("should return 0 when the column has no opponent values", function() {
      expect(game.columnBlockFor("x", 0)).toEqual(0);
    });

    it ("should return 0 when the column has an opponent value, but it is already blocked", function() {
      game.mark("o", 3);
      game.mark("x", 6);
      expect(game.rowBlockFor("x", 0)).toEqual(0);
    });
  });

  describe("#diagonalsBlockFor", function() {
    it ("should return 4 when both diagonals contain 2 opponent values", function() {
      game.mark("o", 0);
      game.mark("o", 2);
      game.mark("o", 6);
      game.mark("o", 8);
      expect(game.diagonalsBlockFor("x", 4)).toEqual(4);
    });

    it ("should return 2 when the both diagonals are blocked for the opponent", function() {
      game.mark("o", 0);
      game.mark("o", 2);
      expect(game.diagonalsBlockFor("x", 4)).toEqual(2);
    });

    it ("should return 1 when the 1 diagonal \\ is blocked for the opponent", function() {
      game.mark("o", 0);
      expect(game.diagonalsBlockFor("x", 4)).toEqual(1);
    });

    it ("should return 0 when the diagonals has no opponent values", function() {
      expect(game.diagonalsBlockFor("x", 0)).toEqual(0);
    });
  });


  describe("#rowOpenFor", function() {
    it ("should return 2 for a winning row", function() {
      game.mark("x", 0);
      game.mark("x", 1);
      expect(game.rowOpenFor("x", 2)).toEqual(2);
    });

    it ("should return 1 when the row has no opponent values", function() {
      game.mark("x", 2);
      expect(game.rowOpenFor("x", 0)).toEqual(1);
    });

    it ("should return 0 when the row has opponent values", function() {
      game.mark("o", 2);
      expect(game.rowOpenFor("x", 0)).toEqual(0);
    });
  });

  describe("#columnOpenFor", function() {
    it ("should return 2 for a winning column", function() {
      game.mark("x", 0);
      game.mark("x", 3);
      expect(game.columnOpenFor("x", 6)).toEqual(2);
    });

    it ("should return 1 when the column has no opponent values", function() {
      game.mark("x", 6);
      expect(game.columnOpenFor("x", 0)).toBeTruthy();
    });

    it ("should return 0 when the column has opponent values", function() {
      game.mark("o", 6);
      expect(game.columnOpenFor("x", 0)).toBeFalsy();
    });
  });

  describe("#diagonalsOpenFor", function() {
    it ("should return 4 for a double-winning diagonal", function() {
      game.mark("x", 0);
      game.mark("x", 2);
      game.mark("x", 6);
      game.mark("x", 8);
      expect(game.diagonalsOpenFor("x", 4)).toEqual(4);
    });

    it ("should return 2 when the diagonals have no opponent values", function() {
      game.mark("x", 4);
      expect(game.diagonalsOpenFor("x", 4)).toEqual(2);
    });

    it ("should return 1 when a diagonal has 1 opponent values", function() {
      game.mark("o", 6);
      expect(game.diagonalsOpenFor("x", 4)).toEqual(1);
    });

    it ("should return 0 when the cell isn't on a diagonal", function() {
      game.mark("x", 1);
      expect(game.diagonalsOpenFor("x", 1)).toEqual(0);
    });
  });

  describe("#rowForCell", function() {
    it ("should return the row values for a given cell index", function() {
      game.mark("x", 0);
      game.mark("o", 1);
      game.mark("x", 2);
      expect(game.rowForCell(0)).toEqual(["x", "o", "x"]);
    });
  });

  describe("#columnForCell", function() {
    it ("should return the column values for a given cell index", function() {
      game.mark("x", 0);
      game.mark("o", 3);
      game.mark("x", 6);
      expect(game.columnForCell(0)).toEqual(["x", "o", "x"]);
    });
  });

  describe("#diagonalsForCell", function() {
    it ("should return the \\ diagonal values for a \\ diagonal cell index", function() {
      game.mark("x", 0);
      game.mark("o", 4);
      game.mark("x", 8);
      expect(game.diagonalsForCell(0)).toEqual([xox, null]);
    });

    it ("should return the / diagonal values for a / diagonal cell index", function() {
      game.mark("x", 2);
      game.mark("o", 4);
      game.mark("x", 6);
      expect(game.diagonalsForCell(2)).toEqual([null, xox]);
    })

    it ("should return both the \\ and / diagonal values for the middle index", function() {
      game.mark("x", 0);
      game.mark("o", 4);
      game.mark("x", 8);
      game.mark("x", 2);
      game.mark("o", 4);
      game.mark("x", 6);
      expect(game.diagonalsForCell(4)).toEqual([xox, xox]);
    });

    it ("should return two nulls for a non-diagonal cell index", function() {
      expect(game.diagonalsForCell(1)).toEqual([null, null]);
    });
  });
});
