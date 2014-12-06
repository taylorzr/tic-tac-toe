describe("Intelligence", function() {
  var intel;
  var board;

  beforeEach(function() {
    board = new Board();
    intel = new Intelligence(board);
  });

  describe("#bestCellFor", function() {
    it ("should return the middle cell if the board is empty", function() {
      expect(intel.bestCellFor("x")).toEqual(4);
    });

    it ("should return the cell that wins the board", function() {
      board.mark("x", 0);
      board.mark("x", 1);
      expect(intel.bestCellFor("x")).toEqual(2);
    });

    it ("should return the cell that blocks losing the board", function() {
      board.mark("o", 0);
      board.mark("o", 1);
      expect(intel.bestCellFor("x")).toEqual(2);
    });

    it ("should return the cell that provides the greatest possiblilty for winning, and the least possibility for losing", function() {
      board.mark("x", 0);
      board.mark("o", 4);
      board.mark("x", 8);
      expect(intel.bestCellFor("x")).toEqual(2);
    });
  });

  describe("#openRatingFor", function() {
    it ("should return 4 for the center cell on an empty board", function() {
      expect(intel.openRatingFor("x", 4, board)).toEqual(4);
    });

    it ("should return 0 for the center cell full blocked", function() {
      board.mark("o", 3);
      board.mark("o", 7);
      board.mark("o", 0);
      board.mark("o", 2);
      expect(intel.openRatingFor("x", 4)).toEqual(0);
    });
  });

  describe("#blockRatingFor", function() {
    it ("should return 4 for the center cell blocking horizontal, vertical and diagonals", function() {
      board.mark("o", 3);
      board.mark("o", 7);
      board.mark("o", 0);
      board.mark("o", 2);
      expect(intel.blockRatingFor("x", 4)).toEqual(4);
    });

    it ("should return 0 for an empty board", function() {
      expect(intel.blockRatingFor("x", 4)).toEqual(0);
    });
  });

  describe("#rowBlockFor", function() {
    it ("should return 2 when the row has 2 opponent values", function() {
      board.mark("o", 1);
      board.mark("o", 2);
      expect(intel.rowBlockFor("x", 0)).toEqual(2);
    });
    
    it ("should return 1 when the row has 1 opponent value", function() {
      board.mark("o", 2);
      expect(intel.rowBlockFor("x", 0)).toEqual(1);
    });

    it ("should return 0 when the row has no opponent values", function() {
      expect(intel.rowBlockFor("x", 0)).toEqual(0);
    });

    it ("should return 0 when the row has an opponent value, but it is already blocked", function() {
      board.mark("o", 1);
      board.mark("x", 2);
      expect(intel.rowBlockFor("x", 0)).toEqual(0);
    });
  });

  describe("#columnBlockFor", function() {
    it ("should return 2 when the column has 2 opponent values", function() {
      board.mark("o", 3);
      board.mark("o", 6);
      expect(intel.columnBlockFor("x", 0)).toEqual(2);
    });

    it ("should return 1 when the column has 1 opponent value", function() {
      board.mark("o", 6);
      expect(intel.columnBlockFor("x", 0)).toEqual(1);
    });

    it ("should return 0 when the column has no opponent values", function() {
      expect(intel.columnBlockFor("x", 0)).toEqual(0);
    });

    it ("should return 0 when the column has an opponent value, but it is already blocked", function() {
      board.mark("o", 3);
      board.mark("x", 6);
      expect(intel.rowBlockFor("x", 0)).toEqual(0);
    });
  });

  describe("#diagonalsBlockFor", function() {
    it ("should return 4 when both diagonals contain 2 opponent values", function() {
      board.mark("o", 0);
      board.mark("o", 2);
      board.mark("o", 6);
      board.mark("o", 8);
      expect(intel.diagonalsBlockFor("x", 4)).toEqual(4);
    });

    it ("should return 2 when the both diagonals are blocked for the opponent", function() {
      board.mark("o", 0);
      board.mark("o", 2);
      expect(intel.diagonalsBlockFor("x", 4)).toEqual(2);
    });

    it ("should return 1 when the 1 diagonal \\ is blocked for the opponent", function() {
      board.mark("o", 0);
      expect(intel.diagonalsBlockFor("x", 4)).toEqual(1);
    });

    it ("should return 0 when the diagonals has no opponent values", function() {
      expect(intel.diagonalsBlockFor("x", 0)).toEqual(0);
    });
  });


  describe("#rowOpenFor", function() {
    it ("should return 2 for a winning row", function() {
      board.mark("x", 0);
      board.mark("x", 1);
      expect(intel.rowOpenFor("x", 2)).toEqual(2);
    });

    it ("should return 1 when the row has no opponent values", function() {
      board.mark("x", 2);
      expect(intel.rowOpenFor("x", 0)).toEqual(1);
    });

    it ("should return 0 when the row has opponent values", function() {
      board.mark("o", 2);
      expect(intel.rowOpenFor("x", 0)).toEqual(0);
    });
  });

  describe("#columnOpenFor", function() {
    it ("should return 2 for a winning column", function() {
      board.mark("x", 0);
      board.mark("x", 3);
      expect(intel.columnOpenFor("x", 6)).toEqual(2);
    });

    it ("should return 1 when the column has no opponent values", function() {
      board.mark("x", 6);
      expect(intel.columnOpenFor("x", 0)).toBeTruthy();
    });

    it ("should return 0 when the column has opponent values", function() {
      board.mark("o", 6);
      expect(intel.columnOpenFor("x", 0)).toBeFalsy();
    });
  });

  describe("#diagonalsOpenFor", function() {
    it ("should return 4 for a double-winning diagonal", function() {
      board.mark("x", 0);
      board.mark("x", 2);
      board.mark("x", 6);
      board.mark("x", 8);
      expect(intel.diagonalsOpenFor("x", 4)).toEqual(4);
    });

    it ("should return 2 when the diagonals have no opponent values", function() {
      board.mark("x", 4);
      expect(intel.diagonalsOpenFor("x", 4)).toEqual(2);
    });

    it ("should return 1 when a diagonal has 1 opponent values", function() {
      board.mark("o", 6);
      expect(intel.diagonalsOpenFor("x", 4)).toEqual(1);
    });

    it ("should return 0 when the cell isn't on a diagonal", function() {
      board.mark("x", 1);
      expect(intel.diagonalsOpenFor("x", 1)).toEqual(0);
    });
  });
});
