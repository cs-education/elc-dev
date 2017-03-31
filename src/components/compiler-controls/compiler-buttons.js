import React from 'react';
import Clipboard from 'clipboard';

import playButton from '../../assets/play.png';
import stopButton from '../../assets/stop.png';
import resetButton from '../../assets/reset.png';
import copyButton from '../../assets/copy.png';
import clearButton from '../../assets/clear.png';

export default (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  }

  const handleQuit = (e) => {
    e.preventDefault();
    props.handleQuit();
  }

  const copyToClipboard = (e) => {
    e.preventDefault();
    props.copyToClipboard();
  }

  let copyId = props.editor + '-copy';
  let target = '#' + props.editor;
  (new Clipboard('#' + copyId));

  return (
    <div className="compiler-buttons">
      <input type="image" id="execute-img" title="Execute Code" src={playButton} onClick={handleSubmit} />
      <input type="image" id="quit-img" title="Stop Program" src={stopButton} onClick={handleQuit} />
      <input type="image" id="reset-code" title="Reset Code" src={resetButton} onClick={props.reset} />
      <input type="image"
        title="Copy to Clipboard"
        id={copyId}
        src={copyButton}
        data-clipboard-target={target}
        onClick={copyToClipboard} />
    </div>
  );
}
