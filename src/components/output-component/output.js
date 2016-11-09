import React from 'react';

import OutputControls from './output-controls';

export default (props) => {
  const toggleClear = () => props.toggleClear();

  return (
    <div className="output">
      <pre><b>Program Output</b></pre>
      {props.output}
      <OutputControls
        toggleClear={toggleClear} />
    </div>
  );
}
