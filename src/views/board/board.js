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
