import React from 'react';
import { shuffle } from '../utils';

class Board extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      rows: 4,
      columns: 4,
      tiles: [],
    };
  }

  componentDidMount () {
    this.initBoard();
  }

  initBoard () {
    const {columns, rows} = this.state;
    let size = rows * columns - 1;
    let tiles = Array.from(Array(size).keys(), (v, k) => k + 1);
    tiles.push(null);
    shuffle(tiles);

    this.setState({
      tiles: tiles,
    });
  }

  getTileAdjacent (tile) {
    const {columns, rows, tiles} = this.state;
    const tileIdx = tiles.indexOf(tile);
    const row = Math.floor(tileIdx / rows);
    const col = tileIdx - (row * rows);
    let adjacent = [];

    if (row > 0) {adjacent.push(tiles[(rows * row) + col - 1]);}
    if (row < rows) {adjacent.push(tiles[(rows * row) + col + 1]);}
    if (col > 0) {adjacent.push(tiles[rows * (row - 1) + col]);}
    if (col < columns) {adjacent.push(tiles[rows * (row + 1) + col]);}

    return adjacent.filter(t => typeof t !== 'undefined');
  }

  getEmptyAdjacentIdx (tile) {
    const {tiles} = this.state;
    let adjacent = this.getTileAdjacent(tile);
    if (adjacent.some(t => t === null)) {
      return tiles.indexOf(null);
    }
  }

  render () {
    const {tiles} = this.state;

    return (
      <div>
        <h1>15 Puzzle Boards</h1>
        <div>
          {tiles.map((tile, idx) => <span key={idx}> | {tile} | </span>)}
        </div>
      </div>
    );
  }
}

export default Board;
