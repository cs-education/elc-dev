import React from 'react';

import OutputControls from './output-controls';

export default (props) => {
  // const setClear = () => props.setClear(true);
  // const setAppend = () => props.setClear(false);
  const setClear = () => console.log(true);
  const setAppend = () => console.log(false);

  return (
    <div className="output">
      <pre><b>Program Output</b></pre>
      {props.output}
      <OutputControls
        setClear={setClear}
        setAppend={setAppend} />
    </div>
  );
}
