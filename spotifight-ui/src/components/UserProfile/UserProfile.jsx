import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {Grid, Button} from './../Global/Material-Globals';
import './Background.scss';
import $ from 'jquery';
import Paper from "material-ui/Paper";
import ProfileUpdate from './ProfileUpdate.jsx'

import {storeCurrentUser} from './../../actions/index';
import UserParticle from '../Games/Masher/particles/Particles.jsx'

import Verify from '../Auth/Verify.jsx';
import {userEmail} from '../../routes.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {},
      update: false,
      usernameInput: '',
      avatarInput: '',
      statusInput: ''
    };

    this.weUpdated = this.weUpdated.bind(this);
    this.getUser = this.getUser.bind(this);

  }

  async weUpdated(email) {
    try {
      const user = this.props.userProfile
      await this.getUser(email)
      await this.setState({usernameInput: user.email, avatarInput: user.avatar_url, statusInput: user.status})
    }
    catch(err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    // listener for modal black space click

    const {email: storedEmail} = JSON.parse(localStorage.getItem('user')) || {
      email: ''
    };
    let email;
    console.log('here the location pathname', this.props.location.pathname);
    if (this.props.location.pathname !== '/user-profile/') {
      email = this.props.location.pathname.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)[0].replace('/user-profile/', '');
    } else {
      email = storedEmail;
    }
    console.log(email, 'here is the axios email');

    await this.getUser(email);
  }

  async getUser(email) {
    try {
      let payload = await axios.get(`/users/email/${email}`);
      payload.data.userProfile.avatar_url = payload.data.userProfile.avatar_url + '0';
      this.props.storeCurrentUser(payload.data.userProfile);

      this.setState({user: payload.data.userProfile});
      localStorage.setItem('token', payload.data.token);
      localStorage.setItem('user', JSON.stringify(payload.data.userProfile));
    } catch (err) {
      console.log(err, 'error in getUser--> Userprofile')
    }
  }

  render() {

    let user = this.props.userProfile;


    return (<div className="section profile-heading margin-me">
      <div id="particle-div"><UserParticle userProfile={this.props.userProfile}/></div>
      <div className="content">
        <div className="columns">
          <div className="column is-4 name">
            <div className="image is-128x128 avatar">
              <img src='{user.avatar_url}' />
            </div>
            <br/>
            <span className="button is-primary is-outlined follow">
              Follow
            </span>
            <p>
              <br/>
              <span className="title is-bold">{user.username}</span>
            </p>
            <p className="tagline">
              <em>"{user.status}"</em>
            </p>

            <ProfileUpdate userProfile={this.props.userProfile} weUpdated={this.weUpdated}/>

          </div>
          <div className="column is-2 likes has-text-centered">
            <p className="stat-val">{user.friends}</p>
            <p className="stat-key">friends</p>

          </div>
          <div className="column is-2 followers has-text-centered">
            <p className="stat-val">{user.wins}</p>
            <p className="stat-key">wins</p>
          </div>
          <div className="column is-2 following has-text-centered">
            <p className="stat-val">{user.losses}</p>
            <p className="stat-key">losses</p>

          </div>

        </div>
      </div>

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
