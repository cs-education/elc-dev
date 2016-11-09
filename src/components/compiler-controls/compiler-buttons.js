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

  return (
    <div className="compiler-buttons">
      <button onClick={handleEdit}>{ props.toggled ? 'Lock Text' : 'Edit'}</button>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleQuit}>Quit Program</button>
    </div>
  );
}
