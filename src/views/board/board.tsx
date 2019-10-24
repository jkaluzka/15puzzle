import Fab from '@material-ui/core/Fab';
import * as React from 'react';

import {shuffle} from '../utils';

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
} as React.CSSProperties;

class Board extends React.Component<React.CSSProperties, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      rows: 4,
      columns: 4,
      tiles: [],
    };
  }

  componentDidMount() {
    this.initBoard();
  }

  initBoard() {
    const {columns, rows} = this.state;
    let size = rows * columns - 1;
    let tiles = Array.from(Array(size).keys(), (v, k) => k + 1);
    tiles.push(null as any);
    shuffle(tiles);

    this.setState({
      tiles: tiles,
    });
  }

  getTileAdjacent(tile: any) {
    const {columns, rows, tiles} = this.state;
    const tileIdx = tiles.indexOf(tile);
    const row = Math.floor(tileIdx / rows);
    const col = tileIdx - (row * rows);
    let adjacent = [];

    if (row >= 0) {adjacent.push(tiles[(rows * row) + col - 1]);}
    if (row < rows) {adjacent.push(tiles[(rows * row) + col + 1]);}
    if (col >= 0) {adjacent.push(tiles[rows * (row - 1) + col]);}
    if (col < columns) {adjacent.push(tiles[rows * (row + 1) + col]);}

    return adjacent.filter(t => typeof t !== 'undefined');
  }

  getEmptyAdjacentIdx(tile: any) {
    const {tiles} = this.state;
    let adjacent = this.getTileAdjacent(tile);
    if (adjacent.some(t => t === null)) {
      return tiles.indexOf(null);
    }
  }

  onTileClick(tile: any) {
    const {tiles} = this.state;
    let tileIdx = tiles.indexOf(tile);
    let idx = this.getEmptyAdjacentIdx(tile);
    if (idx >= 0) {
      let tmp = tiles[idx];
      tiles[idx] = tiles[tileIdx];
      tiles[tileIdx] = tmp;
      this.setState({tiles: tiles});
    }

    if (this.isSolved()) {
      console.info('congratulations, you solved it!');
    }
  }

  isSolved() {
    const {tiles} = this.state;
    for (let i = tiles.length - 2; i >= 0; i--) {
      if (tiles[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }

  render() {
    const {columns, rows, tiles} = this.state;
    const width = 56 * columns;

    return (
      <div style={container}>
        <h1>15 Puzzle Boards ({rows} x {columns} )</h1>
        <div style={{display: 'flex', flexWrap: 'wrap', width: width}}>
          {tiles.map((tile: any, idx: number) => (
              !!tile ?
              <Fab key={idx}
                   onClick={() => this.onTileClick(tile)}
                   style={{width: '50px', margin: '3px', backgroundColor: tile % 2 === 0 ? 'red' : 'green'}}>
                {tile}
              </Fab> :
              <Fab disabled key={idx} style={{width: '50px', margin: '3px', backgroundColor: 'white'}}>
                <span> </span>
              </Fab>
            ),
          )}
        </div>
      </div>
    );
  }
}

export default Board;
