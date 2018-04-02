import React, {Component} from 'react';
import Button from 'material-ui/Button';
import axios from 'axios';
import $ from 'jquery';
import './Signup.scss'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      username: '',
      authError: ''
    }

  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
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
      $('#submit').prop('disabled', true)
      $('.clearField').val('');
      redirect = true;
      console.log(data, 'response on the dom')
      if (data.data.constraint === 'users_email_key' || data.data.constraint === 'users_username_key') {
        redirect = false;
        message = `Your ${data.data.constraint.split('_')[1]} is already taken.`
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (redirect) {
        this.props.history.push('/login')
      } else {
        $('#submit').prop('disabled', false)
        this.setState({authError: message})
      }
    }
  }

  render() {
    return (<div id="sign-up">
      <h1>Sign up</h1>
      <label>email:
      </label>
      <input type="text" className='clearField' onChange={(e) => this.handleEmailChange(e)}/>
      <label>p/w:
      </label>
      <input type="password" className='clearField' onChange={(e) => this.handlePasswordChange(e)}/>
      <label>username:
      </label>
      <input type="text" className='clearField' onChange={(e) => this.handleUsernameChange(e)}/>
      <button id="submit" onClick={() => this.signUp()}>
        Sign-Up
      </button>
      <div className="authError">
        {this.state.authError}
      </div>
    </div>);
  }
}

export default Signup;
