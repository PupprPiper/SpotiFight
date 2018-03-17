import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <label>u/n: </label>
        <input type="text" />
        <label>p/w: </label>
        <input type="password" />
      </div>
    );
  }
}

export default Signup;
