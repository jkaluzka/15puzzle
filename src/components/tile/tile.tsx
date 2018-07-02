import Fab from '@material-ui/core/Fab';
import * as React from 'react';
import {BoardType} from '../board/board';

type TileProps = {
  tile: BoardType;
  onTileClick: (tile: BoardType) => void;
}

export const Tile = (props: TileProps) => {
  const {tile, onTileClick} = props;
  const style = {
    width: '50px',
    margin: '3px',
    backgroundColor: (tile || 0) % 2 === 0 ? 'rgb(200, 50, 50)' : 'green',
  };

  if (!tile) {
    return <>
      <Fab disabled key={tile} style={{width: '50px', margin: '3px', backgroundColor: 'white'}}>
        <span> </span>
      </Fab>
    </>;
  }

  return <>
    <Fab key={tile}
         onClick={() => onTileClick(tile)}
         style={style}>
      {tile}
    </Fab>
  </>;
}
;
