import React from 'react';

import clearButton from '../../assets/clear.png';

export default (props) => {
  return (
    <div id={props.id} className="output">
      <input type="image" title="Clear Output" src={clearButton} onClick={props.clearOutput}/>
      <pre><b>Program Output</b></pre>
      { props.output }
    </div>
  );
}
