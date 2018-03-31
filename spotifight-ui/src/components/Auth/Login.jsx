import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './../Global/Material-Globals';

import Form from './../Global/Forms/form';
import { googleBtnStyle } from './authHelpers';
import './Login.scss';
import axios from 'axios';
import { Grid } from './../Global/Material-Globals';
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

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  async login() {
    console.log('login-->', this.state);
    try {
      console.log('fgg')
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

  handleRedirect() {
    this.props.history.push('/auth/google');
  }

  render() {
    return (
      <Grid container>
      <section className="hero is-default is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
        <Grid md={3} item />
        <Grid md={6} item>
          <h3 className="title has-text-grey">Please login to proceed</h3>
          <div className="box">
            <form>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-large"
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
                    className="input is-large"
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    onChange={e => this.handleChange(e)}
                  />
                </div>
              </div>
              <br />
              <a
                onClick={() => this.login()}
                className="button is-block is-primary is-large is-fullwidth"
              >
                Login
              </a>
              <a href="/auth/google"
                className="button is-block is-danger is-large is-fullwidth"
              >
                Google+
              </a>
            </form>
          </div>
          <p className="has-text-grey">
            <Link to="/signup">Sign Up</Link> &nbsp;·&nbsp;
            <Link to="/">Forgot Password</Link>
          </p>
        </Grid>
        <Grid md={3} item />
        </div>
        </div>
        </section>
      </Grid>
    );
  }
}

// const Login = () => {
//   return (
//     <section className="hero is-default is-fullheight">
//       <div className="hero-body">
//         <div className="container has-text-centered">
//           <WrappedLogin />
//         </div>
//       </div>
//     </section>
//   );
// };

export default Login;
