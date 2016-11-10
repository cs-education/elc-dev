import React from 'react';

import Terminal from './Terminal';

export default (props) => {
  return (
    <Terminal
      width={props.width}
      height={props.height}
      updateTerm={props.updateTerm} />
  );
}
