import React from 'react';

const Form = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <label>email: </label>
      <input type="text" />
      <label>password: </label>
      <input type="password" />
    </div>
  );
};

export default Form;
