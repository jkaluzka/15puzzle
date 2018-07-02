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
});
