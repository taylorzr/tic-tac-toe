describe("Board", function() {
  var board;
  var xox;

  beforeEach(function() {
    board = new Board();
    xox = ["x", "o", "x"];
    empty = [null, null, null];
  });

  describe("board", function() {
    it ("should have 9 cells", function() {
      expect(board.cells.length).toEqual(9)
    });
  });

  describe("#mark", function() {
    it ("should mark a cell", function() {
      board.mark("x", 0);
      expect(board.cells[0]).toEqual("x");
    });
  });

  describe("#rows", function() {
    it ("should return the rows for the board", function() {
      board.mark("x", 0);
      board.mark("o", 1);
      board.mark("x", 2);
      board.mark("x", 6);
      board.mark("o", 7);
      board.mark("x", 8);
      expect(board.rows()).toEqual([xox, empty, xox]);
    });
  });

  describe("#columns", function() {
    it ("should return the columns for the board", function() {
      board.mark("x", 0);
      board.mark("o", 3);
      board.mark("x", 6);
      board.mark("x", 2);
      board.mark("o", 5);
      board.mark("x", 8);
      expect(board.columns()).toEqual([xox, empty, xox]);
    });
  });

  describe("#diagonals", function() {
    it ("should return the columns for the board", function() {
      board.mark("x", 0);
      board.mark("o", 4);
      board.mark("x", 8);
      board.mark("x", 2);
      board.mark("x", 6);
      expect(board.diagonals()).toEqual([xox, xox]);
    });
  });

  describe("#full", function() {
    it ("should return true for a filled board", function() {
      board.mark("x", 0);
      board.mark("o", 1);
      board.mark("x", 2);
      board.mark("x", 3);
      board.mark("o", 4);
      board.mark("x", 5);
      board.mark("x", 6);
      board.mark("o", 7);
      board.mark("x", 8);
      expect(board.full()).toBeTruthy();
    });
  });

  describe("#winner", function() {
    it ("should return the winner's symbol", function() {
      board.mark("x", 0);
      board.mark("x", 1);
      board.mark("x", 2);
      expect(board.winner()).toEqual("x");
    });
  });

  describe("#rowForCell", function() {
    it ("should return the row values for a given cell index", function() {
      board.mark("x", 0);
      board.mark("o", 1);
      board.mark("x", 2);
      expect(board.rowForCell(0)).toEqual(["x", "o", "x"]);
    });
  });

  describe("#columnForCell", function() {
    it ("should return the column values for a given cell index", function() {
      board.mark("x", 0);
      board.mark("o", 3);
      board.mark("x", 6);
      expect(board.columnForCell(0)).toEqual(["x", "o", "x"]);
    });
  });

  describe("#diagonalsForCell", function() {
    it ("should return the \\ diagonal values for a \\ diagonal cell index", function() {
      board.mark("x", 0);
      board.mark("o", 4);
      board.mark("x", 8);
      expect(board.diagonalsForCell(0)).toEqual([xox, null]);
    });

    it ("should return the / diagonal values for a / diagonal cell index", function() {
      board.mark("x", 2);
      board.mark("o", 4);
      board.mark("x", 6);
      expect(board.diagonalsForCell(2)).toEqual([null, xox]);
    })

    it ("should return both the \\ and / diagonal values for the middle index", function() {
      board.mark("x", 0);
      board.mark("o", 4);
      board.mark("x", 8);
      board.mark("x", 2);
      board.mark("o", 4);
      board.mark("x", 6);
      expect(board.diagonalsForCell(4)).toEqual([xox, xox]);
    });

    it ("should return two nulls for a non-diagonal cell index", function() {
      expect(board.diagonalsForCell(1)).toEqual([null, null]);
    });
  });
});
