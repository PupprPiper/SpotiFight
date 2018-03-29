import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './../Global/Forms/form';
import './Login.scss';
import axios from 'axios';
import $ from 'jquery';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      authError: ''

    }
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  async login() {

    try {
      const { data } = await axios.post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      });
      $('#submit').prop('disabled', true)
      console.log(data, 'response on the dom in login')
      if (data.access) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.email);
        console.log(data.message)
        this.props.history.push('/home')
      } else {
        $('#submit').prop('disabled', false)
        this.setState({authError: data.message})
      }
    } catch (err) {
      console.log(err);
    } finally {}
  }

  render() {
    return (<div>
      <header>
        <h1>Login using...</h1>
      </header>
      <div className="container">
        <h1>Login, you jerk</h1>
        <label>email:
        </label>
        <input className="clearfield" type="text" id="email-field" onChange={(e) => this.handleEmailChange(e)}/>
        <label>password:
        </label>
        <input className="clearfield" type="password" onChange={(e) => this.handlePasswordChange(e)}/>
        <button id="submit" onClick={() => this.login()}>Login</button>
        {this.state.authError}
      </div>
      <div className="container">
        <a href="/auth/google" className="google-btn">
          Google+
        </a>
      </div>
    </div>);
  }
}

export default Login;
