import React from 'react';

import Button from '@material-ui/core/Button/Button';

import { shuffle } from '../utils';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};


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

  onTileClick(tile) {
    const {tiles}  = this.state;
    let tileIdx = tiles.indexOf(tile);
    let idx = this.getEmptyAdjacentIdx(tile);
    if (!!idx) {
      [tiles[idx], tiles[tileIdx]] = [tiles[tileIdx], tiles[idx]];
      this.setState({tiles: tiles});
    }
  }

  render () {
    const {columns, rows, tiles} = this.state;
    const width = 56 * columns;

    return (
      <div style={styles.container}>
        <h1>15 Puzzle Boards ({rows} x {columns} )</h1>
        <div style={{display: 'flex', flexWrap: 'wrap', width: width}}>
          {tiles.map((tile, idx) => (
              !!tile ?
                <Button key={idx} variant='fab'
                        onClick={() => this.onTileClick(tile)}
                        style={{width: '50px', margin: '3px', backgroundColor: tile % 2 === 0 ? 'red' : 'green'}}>
                  {tile}
                </Button> :
                <Button disabled key={idx} variant='fab' style={{width: '50px', margin: '3px', backgroundColor: 'white'}}>
                  <span></span>
                </Button>
            ),
          )}
        </div>
      </div>
    );
  }
}

export default Board;
