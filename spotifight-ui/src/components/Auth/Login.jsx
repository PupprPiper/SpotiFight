import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './../Global/Forms/form';
import './Login.scss';

class Login extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Login using...</h1>
        </header>
        <div className="container">
          <Form title="email" />
        </div>
        <div className="container">
          <a href="/auth/google" className="google-btn">
            Google+
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
