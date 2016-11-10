import React from 'react';

export default (props) => {
  const onChange = (e) => {
    props.handleFileChange(e.target.value);
  }

  return (
    <div className="edit-filename">
      <input type="text" placeholder="main" onChange={onChange}/>
    </div>
  );
}
