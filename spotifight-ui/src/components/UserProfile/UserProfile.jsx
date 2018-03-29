import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography
} from 'material-ui';

import {storeCurrentUser} from './../../actions/index';
import './UserProfile.scss';
import Verify from '../Auth/Verify.jsx';
import {userEmail} from '../../routes.js'

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {}
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    const {email: storedEmail} = JSON.parse(localStorage.getItem('user')) || {
      email: ''
    };
    let email;
    console.log('here the location pathname', this.props.location.pathname)
    if (this.props.location.pathname !== '/user-profile/') {
      email = this.props.location.pathname.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)[0].replace('/user-profile/', '');

    } else {
      email = storedEmail;
    }
    console.log(email, 'here is the axios email')
    this.getUser(email);
  }

  async getUser(email) {
    let payload = await axios.get(`/users/email/${email}`);
    payload.data.userProfile.avatar_url = payload.data.userProfile.avatar_url + '0';
    console.log('user profile', payload.data.userProfile);
    this.props.storeCurrentUser(payload.data.userProfile);
    this.setState({loading: false, user: payload.data.userProfile});
    localStorage.setItem('token', payload.data.token);
    localStorage.setItem('user', JSON.stringify(payload.data.userProfile));

  }

  render() {
    let {loading} = this.state;
    let user = this.props.userProfile;
    if (loading) {
      return <div>loading</div>;
    } else if (!user) {
      return <div>not logged in</div>;
    }

    return (<div>
      <Card>
        <CardHeader avatar={<img src = {
            user.avatar_url
          }
          alt = "..." />}/>
        <CardContent>
          <Typography component="h6">{user.email}</Typography>
          <Typography component="h4">{user.username}</Typography>
          <Typography component="p">
            wins: {user.wins}
            losses: {user.losses}
          </Typography>
        </CardContent>
        <CardActions>footer here</CardActions>
      </Card>
      {
        this.props.location.pathname === '/user-profile/' ? <Verify history={this.props.history}/> : null
      }
    </div>);
  }
}

const mapStateToProps = state => {
  return {userProfile: state.userProfile};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    storeCurrentUser
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
