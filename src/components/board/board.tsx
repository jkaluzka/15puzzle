import * as React from 'react';

import {getEmptyAdjacentIdx, initBoard, isSolved} from '../../utils/board.utils';
import {Tile} from '../tile/tile';

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
} as React.CSSProperties;

export type BoardType = number | null;

type BoardState = {
  rows: number;
  columns: number;
  tiles: BoardType[];
}

class Board extends React.Component<React.CSSProperties, BoardState> {
  constructor(props: any) {
    super(props);

    this.state = {
      rows: 4,
      columns: 4,
      tiles: [],
    };
  }

  componentDidMount() {
    this.setState(({columns, rows}) => {
      const tiles = initBoard(columns, rows);
      return {tiles};
    });
  }

  onTileClick(tile: any) {
    const {tiles, columns, rows} = this.state;
    let tileIdx = tiles.indexOf(tile);
    let idx = getEmptyAdjacentIdx(tiles, tile, columns, rows);
    if (idx >= 0) {
      let tmp = tiles[idx];
      tiles[idx] = tiles[tileIdx];
      tiles[tileIdx] = tmp;
      this.setState(() => ({tiles}));
    }

    if (isSolved(tiles)) {
      console.info('congratulations, you solved it!');
    }
  }

  render() {
    const {columns, rows, tiles} = this.state;
    const width = 56 * columns;

    return (
      <div style={container}>
        <h1>15 Puzzle Boards ({rows} x {columns})</h1>
        <div style={{display: 'flex', flexWrap: 'wrap', width: width}} className="board">
          {tiles.map((tile: BoardType) => (
            <Tile key={tile}
                  tile={tile}
                  onTileClick={(tile: BoardType) => this.onTileClick(tile)} />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
