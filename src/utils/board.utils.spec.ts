import {getEmptyAdjacentIdx, getTileAdjacent, initBoard, isSolved} from './board.utils';

describe('board utils', () => {
  const tiles = [
    0, 1, 2,
    3, null, 5,
    6, 7, 4,
  ];

  describe('initBoard', () => {
    it('should prepare board', () => {
      const tiles = initBoard(4, 4);
      expect(tiles).toHaveLength(16);
    });
  });

  describe('getTileAdjacent', () => {
    it.each([
      [0, [1, 3]],
      [1, [0, 2, null]],
      [2, [1, 5]],
      [3, [null, 0, 6]],
      [5, [null, 2, 4]],
      [6, [7, 3]],
      [7, [6, 4, null]],
      [4, [7, 5]],
    ])('should return for Tile %s the following adjacent %j', (tile, expected) => {
      let adjacent = getTileAdjacent(tiles, tile, 3, 3);
      expect(adjacent).toEqual(expected);
    });

    it('should return for the middle tile all adjacent', () => {
      const tiles = [
        0, 1, 2,
        3, 4, 5,
        6, 7, null,
      ];
      let adjacent = getTileAdjacent(tiles, 4, 3, 3);
      expect(adjacent).toEqual([3, 5, 1, 7]);
    });
  });

  describe('getEmptyAdjacentIdx', () => {
    it.each([
      [1, 4],
      [0, -1],
    ])('should return idx of empty adjacent', (tile, expected) => {
      const emptyIdx = getEmptyAdjacentIdx(tiles, tile, 3, 3);
      expect(emptyIdx).toStrictEqual(expected);
    });

    it('should return correct index on 4x4 board', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, null, 15
      ];
      let adjacent = getEmptyAdjacentIdx(tiles, 15, 4, 4);
      expect(adjacent).toEqual(14);
    });
  });

  describe('isSolved', () => {
    it.each([
      [false, [2, 1]],
      [false, [1, 2, null, 3]],
      [false, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, null]],
      [false, [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
      [true, []],
      [true, [1, 2]],
      [true, [1, 2, 3, null]],
      [true, [1, 2, 3, null]],
      [true, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null]],
    ])('should return %j for tiles array %j', (expected, tiles) => {
      expect(isSolved(tiles)).toStrictEqual(expected);
    });
  });
});
