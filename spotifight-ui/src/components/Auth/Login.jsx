import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './../Global/Material-Globals';

import Form from './../Global/Forms/form';
import { googleBtnStyle } from './authHelpers';
import './Login.scss';
import axios from 'axios';
import $ from 'jquery';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      authError: ''
    };
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  async login() {
    try {
      const { data } = await axios.post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      });
      $('#submit').prop('disabled', true);
      console.log(data, 'response on the dom in login');
      if (data.access) {
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('user', data.email);
        console.log(data, 'here is the access data on the dom');
        this.props.history.push(`/user-profile/${data.email}`);
      } else {
        $('#submit').prop('disabled', false);
        this.setState({ authError: data.message });
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  render() {
    return (
      <div>
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Login</h3>
                <p className="subtitle has-text-grey">
                  Please login to proceed.
                </p>
                <div className="box">
                  <figure className="avatar">
                    <img src="https://placehold.it/128x128" />
                  </figure>
                  <form>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-large"
                          type="email"
                          placeholder="Your Email"
                          autoFocus=""
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-large"
                          type="password"
                          placeholder="Your Password"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="checkbox">
                        <input type="checkbox" /> Remember me
                      </label>
                    </div>

                    <a
                      href="/auth/google"
                      className="button is-block is-danger is-large is-fullwidth"
                    >
                      Google+
                    </a>

                    <button className="button is-block is-info is-large is-fullwidth">
                      Login
                    </button>
                  </form>
                </div>
                <p className="has-text-grey">
                  <a href="../">Sign Up</a> &nbsp;·&nbsp;
                  <a href="../">Forgot Password</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="container">
          <h1>Login, you jerk</h1>
          <label>email:</label>
          <input
            className="clearfield"
            type="text"
            id="email-field"
            onChange={e => this.handleEmailChange(e)}
          />
          <label>password:</label>
          <input
            className="clearfield"
            type="password"
            onChange={e => this.handlePasswordChange(e)}
          />
          <button id="submit" onClick={() => this.login()}>
            Login
          </button>
          {this.state.authError}
        </div>
        <div className="container">
          <a href="/auth/google" className="google-btn">
            Google+
          </a>
        </div> */}
      </div>
    );
  }
}

export default Login;
