import React from 'react';
import Board from '../../views/board/board';
import renderer from 'react-test-renderer';

describe('Board', () => {
  it('renders Board component correctly', () => {
    const tree = renderer.create(<Board />).toJSON();
    expect(tree.children[0]).toMatchSnapshot();
  });

  it('initializing Board when creating component', () => {
    const board = renderer.create(<Board />).root.instance;
    expect(board.state.tiles.length).toBe(16);
  });
});
