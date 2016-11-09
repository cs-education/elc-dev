import React from 'react';

export default (props) => {
  const handleChange = (e) => {
    e.preventDefault();
    props.handleLanguageChange(e.target.value);
  }

  return (
    <select defaultValue="cpp" onChange={handleChange}>
      <option value="c_cpp">C/C++</option>
      <option value="python">Python</option>
    </select>
  );
}
