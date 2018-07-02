import React from 'react';
import Board from '../../views/board/board';
import renderer from 'react-test-renderer';

describe('Board', () => {
  it('renders Board component correctly', () => {
    const tree = renderer.create(<Board />).toJSON();
    expect(tree.children[0]).toMatchSnapshot();
  });
});
