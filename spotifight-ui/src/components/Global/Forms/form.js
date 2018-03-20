import React from 'react';

const Form = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <label>u/n: </label>
      <input type="text" />
      <label>p/w: </label>
      <input type="password" />
    </div>
  );
};

export default Form;