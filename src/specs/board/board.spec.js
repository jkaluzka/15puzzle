import React from 'react';
import Board from '../../views/board/board';
import renderer from 'react-test-renderer';

describe('Board', () => {
  const data = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, null,
  ];

  function compareArrays(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
  }

  it('renders Board component correctly', () => {
    const tree = renderer.create(<Board />).toJSON();
    expect(tree.children[0]).toMatchSnapshot();
  });

  it('initializing Board when creating component', () => {
    const board = renderer.create(<Board />).root.instance;
    expect(board.state.tiles.length).toBe(16);
  });

  it('getting Tile adjacent', () => {
    const board = renderer.create(<Board />).root.instance;
    let tiles = data.map(t => t);
    board.setState({tiles: tiles});
    let adjacent = board.getTileAdjacent(7);
    expect(adjacent.sort((a, b) => a - b)).toEqual([3, 6, 8, 11]);
  });

  it('getting Tile adjacent bottom', () => {
    const board = renderer.create(<Board />).root.instance;
    let tiles = data.map(t => t);
    board.setState({tiles: tiles});
    let adjacent = board.getTileAdjacent(15);
    expect(adjacent.sort((a, b) => a - b)).toEqual([null, 11, 14]);
  });

  it('getting empty adjacent', () => {
    const board = renderer.create(<Board />).root.instance;
    let tiles = data.map(t => t);
    board.setState({tiles: tiles});
    let adjacentIdx = board.getEmptyAdjacentIdx(12);
    expect(adjacentIdx).toBe(15);
  });

  it('test onTileClick do nothing', () => {
    const board = renderer.create(<Board />).root.instance;
    let tiles = data.map(t => t);
    board.setState({tiles: tiles});
    board.onTileClick(7);
    expect(compareArrays(board.state.tiles, data)).toBe(true);
  });

  it('test onTileClick swap tile with null one', () => {
    const board = renderer.create(<Board />).root.instance;
    let tiles = data.map(t => t);
    board.setState({tiles: tiles});
    board.onTileClick(12);
    let expected = data.map(t => t);
    expected[15] = 12;
    expected[11] = null;
    expect(compareArrays(board.state.tiles, expected)).toBe(true);
  });

  it('test onTileClick swap tile with null (edge case, left upper corner)', () => {
    const board = renderer.create(<Board />).root.instance;
    let tiles = data.map(t => t);
    tiles[0] = null;
    tiles[15] = 1;
    board.setState({tiles: tiles});
    board.onTileClick(2);
    let expected = tiles.map(t => t);
    expected[0] = 2;
    expected[1] = null;
    expect(compareArrays(board.state.tiles, expected)).toBe(true);
  });

  it('test isSolved returns true', () => {
    const board = renderer.create(<Board />).root.instance;
    let tiles = data.map(t => t);
    board.setState({tiles: tiles});
    let solved = board.isSolved();
    expect(solved).toBe(true);
  });

  it('test isSolved returns false', () => {
    const board = renderer.create(<Board />).root.instance;
    let tiles = data.map(t => t);
    tiles[0] = 2;
    tiles[1] = 1;
    board.setState({tiles: tiles});
    let solved = board.isSolved();
    expect(solved).toBe(false);
  });
});
