import {BoardType} from '../components/board/board';

export type OptionalNumber = number | null;

const shuffle = (array: Array<number>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const initBoard = (columns: number, rows: number): BoardType[] => {
  let size = rows * columns - 1;
  let tiles = Array.from(Array(size).keys(), (v: number, k: number) => k + 1);
  tiles.push(null as any);
  shuffle(tiles);
  return tiles;
};

export const getTileAdjacent = (
  tiles: BoardType[],
  tile: number,
  columns: number,
  rows: number,
): OptionalNumber[] => {
  const tileIdx = tiles.indexOf(tile);
  const row = Math.floor(tileIdx / rows);
  const col = tileIdx - (row * rows);
  let adjacent = [];

  if (row >= 0 && col) {adjacent.push(tiles[(rows * row) + col - 1]);}
  if (row < rows && col < columns - 1) {adjacent.push(tiles[(rows * row) + col + 1]);}
  adjacent.push(tiles[rows * (row - 1) + col]);
  adjacent.push(tiles[rows * (row + 1) + col]);

  return adjacent.filter(t => typeof t !== 'undefined');
};

export const getEmptyAdjacentIdx = (
  tiles: BoardType[],
  tile: number,
  columns: number,
  rows: number,
): number => {
  let adjacent = getTileAdjacent(tiles, tile, columns, rows);
  if (adjacent.some(t => t === null)) {
    return tiles.indexOf(null);
  }
  return -1;
};

export const isSolved = (tiles: BoardType[]): boolean => {
  for (let i = tiles.length - 2; i >= 0; i--) {
    if (tiles[i] !== i + 1) {
      return false;
    }
  }
  return true;
};
