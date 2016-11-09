import React from 'react';

import OutputControls from './output-controls';

export default (props) => {
  return (
    <div className="output">
      <pre><b>Program Output</b></pre>
      { props.output }
      <OutputControls
        toggleClear={props.toggleClear} />
    </div>
  );
}
