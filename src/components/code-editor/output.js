import React from 'react';

export default (props) => {
  return (
    <div className="output">
      <pre><b>Program Output</b></pre>
      { props.output }
    </div>
  );
}
