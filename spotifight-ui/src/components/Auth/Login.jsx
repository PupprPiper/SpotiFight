import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './../Global/Material-Globals';
import Form from './../Global/Forms/form';
import { googleBtnStyle } from './authHelpers';
import './Login.scss';

class Login extends Component {
  render() {
    return <div>
        <header>
          <h1>Login using...</h1>
        </header>
        <div className="container">
          <Form title="email" />
        </div>
        <div className="container">
          <Button href="/auth/google" style={googleBtnStyle} variant="raised">
            Google+
          </Button>
        </div>
      </div>;
  }
}

export default Login;
