import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Board from '../board/board';
import {Tile} from './tile';

describe('Board', () => {
  const mockOnTileClick = jest.fn();
  beforeEach(() => {
    render(<Tile tile={1} onTileClick={mockOnTileClick} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Tile component correctly', () => {
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('button').textContent).toBe('1');
  });

  it('should call callback on click action', () => {
    userEvent.click(screen.getByRole('button'));
    expect(mockOnTileClick).toHaveBeenCalledTimes(1);
    expect(mockOnTileClick).toHaveBeenCalledWith(1);
  });
});
