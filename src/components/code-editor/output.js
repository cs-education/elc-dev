import React from 'react';

import clearButton from '../../assets/clear.png';

export default (props) => {
  return (
    <div className="output">
      <input type="image" title="Clear Output" src={clearButton} onClick={props.clearOutput}/>
      <pre><b>Program Output</b></pre>
      { props.output }
    </div>
  );
}
