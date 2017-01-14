import React from 'react';

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
    props.clearOutput();
  }

  return (
    <div className="compiler-buttons">
      <button onClick={handleEdit}>{ props.toggled ? 'Lock Text' : 'Edit' }</button>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleQuit}>Quit Program</button>
      <button onClick={clearOutput}>Clear Output</button>
    </div>
  );
}
