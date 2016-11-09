import React from 'react';

export default (props) => {
  return (
    <div className="output-controls">
      <label>
        <input type="radio" value="clear" name="output" onChange={props.toggleClear} />
        Clear
      </label>
      <label>
        <input type="radio" value="append" name="output" onChange={props.toggleClear} />
        Append
      </label>
    </div>
  );
}
