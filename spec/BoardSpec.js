describe("Board", function() {
  var board;
  var xox;

  beforeEach(function() {
    board = new Board();
    xox = ["x", "o", "x"];
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
