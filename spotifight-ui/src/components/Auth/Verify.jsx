import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, history} from 'react-router-dom';
import axios from 'axios';

class Verify extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
    this.authCheck = this.authCheck.bind(this);

  }

  componentDidMount() {
    this.authCheck()

  }

  authCheck() {
    const token = localStorage.getItem('token')
    axios.post('auth/isLoggedIn', {token: token}).then((data) => {
      console.log('auth token has been sent: data back->', data.data)
      if (data.data === 'redirect') {
        this.props.history.push('/login');
      }
    });
  }

  render() {
    // {console.log(this.props, 'here is verify props')}
>>>>>>> protecting routes with JWT
    return (<div></div>);
  }

}

export default Verify;
