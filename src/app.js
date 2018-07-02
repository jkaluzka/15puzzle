import React from 'react';
import ReactDOM from 'react-dom';

import Board from './views/board/board';

ReactDOM.render(
  <Board />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
