import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as boardUtils from '../../utils/board.utils';
import Board from '../board/board';

describe('Board', () => {
  let board;

  beforeEach(() => {
    board = [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, null, 15,
    ];
    jest.spyOn(boardUtils, 'initBoard').mockReturnValue(board);
    render(<Board />);
  });

  it('renders Board component correctly', () => {
    expect(screen.getByRole('heading').textContent).toBe('15 Puzzle Boards (4 x 4)');
    expect(screen.getAllByRole('button')).toHaveLength(16);
  });

  it('should do nothing when no empty tile around', () => {
    let buttons = screen.getAllByRole('button');
    expect(buttons[1].textContent).toStrictEqual('2');
    userEvent.click(buttons[1]);
    buttons = screen.getAllByRole('button');
    expect(buttons[1].textContent).toStrictEqual('2');
  });

  it('should set state properly when clicking on tile', () => {
    let buttons = screen.getAllByRole('button');
    expect(buttons[14].textContent).toStrictEqual(' ');
    userEvent.click(buttons[10]);
    buttons = screen.getAllByRole('button');
    expect(buttons[14].textContent).toStrictEqual('11');
    expect(buttons[10].textContent).toStrictEqual(' ');
  });

  it('should print message when solved', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    let buttons = screen.getAllByRole('button');
    userEvent.click(buttons[15]);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('congratulations, you solved it!');
  });
});
