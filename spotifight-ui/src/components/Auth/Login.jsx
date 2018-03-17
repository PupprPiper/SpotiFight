import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <label>u/n: </label>
        <input type="text" />
        <label>p/w: </label>
        <input type="password" />
      </div>
    );
  }
}

export default Login;
