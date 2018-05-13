import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './../Global/Material-Globals';

import Form from './../Global/Forms/form';
import { googleBtnStyle } from './authHelpers';
import './Login.scss';
import axios from 'axios';
import { Grid } from './../Global/Material-Globals';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      authError: ''
    };
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  async login() {
    try {
      const { data } = await axios.post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      });
      if (data.access) {
        this.props.history.push(`/user-profile/${data.email}`);
      } else {
        this.setState({ authError: data.message });
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleRedirect() {
    this.props.history.push('/auth/google');
  }

  render() {
    return (
      <section className="hero is-default is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <Grid container>
              <Grid item sm={12} md={3} lg={3} />
              <Grid item sm={12} md={6} lg={6}>
                <h3 className="title has-text-grey">
                  Please log in to proceed
                </h3>
                <div className="box">
                  <form>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="password"
                          name="password"
                          placeholder="Your Password"
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div class=".auth-container">{this.state.authError}</div>
                    <a
                      id="submit"
                      onClick={() => this.login()}
                      className="button is-block is-medium is-primary"
                    >
                      Login
                    </a>
                    <br />
                    <h3 className="title has-text-grey">Social</h3>
                    <a
                      href="/auth/google"
                      className="button is-block is-medium google-btn"
                    >
                      Google+
                    </a>
                  </form>
                </div>
                <p className="has-text-grey">
                  <Link to="/signup">Sign Up</Link>
                </p>
              </Grid>
              <Grid item sm={12} md={3} lg={3} />
            </Grid>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
