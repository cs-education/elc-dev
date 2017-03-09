import React from 'react';
import Clipboard from 'clipboard';

export default (props) => {
  const handleEdit = (e) => {
    e.preventDefault();
    props.handleEdit();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  }

  const handleQuit = (e) => {
    e.preventDefault();
    props.handleQuit();
  }

  const clearOutput = (e) => {
    e.preventDefault();
    props.clearOutput();
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
      <button onClick={handleEdit}>{ props.toggled ? 'Lock Text' : 'Edit' }</button>
      <button onClick={handleSubmit}>Execute</button>
      <button onClick={handleQuit}>Quit Program</button>
      <button onClick={clearOutput}>Clear Output</button>
      <button
        id={copyId}
        data-clipboard-target={target}
        onClick={copyToClipboard}>
        Copy to Clipboard
      </button>
    </div>
  );
}
