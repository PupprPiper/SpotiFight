import React, { Component } from 'react';
import Button from 'material-ui/Button';
import axios from 'axios';
import $ from 'jquery';
import './Signup.scss';
import { Grid } from './../Global/Material-Globals';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      authError: ''
    };
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  async signUp() {
    let redirect;
    let message;
    try {
      const data = await axios.post('/auth/signUp', {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      });
      $('#submit').prop('disabled', true);
      $('.clearField').val('');
      redirect = true;
      if (
        data.data.constraint === 'users_email_key' ||
        data.data.constraint === 'users_username_key'
      ) {
        redirect = false;
        message = `Your ${
          data.data.constraint.split('_')[1]
        } is already taken.`;
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (redirect) {
        this.props.history.push('/login');
      } else {
        $('#submit').prop('disabled', false);
        this.setState({ authError: message });
      }
    }
  }

  render() {
    return (
      <section className="hero is-default is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <Grid container>
              <Grid item sm={12} md={3} lg={3} />
              <Grid item sm={12} md={6} lg={6}>
                <h3 className="title has-text-grey">Create a New Account</h3>
                <div className="box">
                  <form>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium clearField"
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
                          className="input is-medium clearField"
                          type="username"
                          name="username"
                          placeholder="Your Username"
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium clearField"
                          type="password"
                          name="password"
                          placeholder="Your Password"
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <a
                      id="submit"
                      onClick={() => this.signUp()}
                      className="button is-block is-primary is-medium is-fullwidth"
                    >
                      Sign Up
                    </a>
                  </form>
                  <div className="authError">
                    <h3 className="title has-text-red">
                      {' '}
                      {this.state.authError}{' '}
                    </h3>
                  </div>
                </div>
                <p className="has-text-grey">
                  <Link to="/login">Login</Link>
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

export default Signup;
