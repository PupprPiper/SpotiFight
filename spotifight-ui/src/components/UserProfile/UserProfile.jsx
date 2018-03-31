import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { storeCurrentUser } from './../../actions/index';
import './UserProfile.scss';
import Verify from '../Auth/Verify.jsx';
import { userEmail } from '../../routes.js';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {}
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const { email: storedEmail } = JSON.parse(localStorage.getItem('user')) || {
      email: ''
    };
    let email;
    console.log('here the location pathname', this.props.location.pathname);
    if (this.props.location.pathname !== '/user-profile/') {
      email = this.props.location.pathname
        .match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )[0]
        .replace('/user-profile/', '');
    } else {
      email = storedEmail;
    }
    console.log(email, 'here is the axios email');
    this.getUser(email);
  }

  async getUser(email) {
    let payload = await axios.get(`/users/email/${email}`);
    payload.data.userProfile.avatar_url =
      payload.data.userProfile.avatar_url + '0';
    console.log('user profile', payload.data.userProfile);
    this.props.storeCurrentUser(payload.data.userProfile);
    console.log(this.props, 'PROPS IN USERPROFILE');
    this.setState({ loading: false, user: payload.data.userProfile });
    localStorage.setItem('token', payload.data.token);
    localStorage.setItem('user', JSON.stringify(payload.data.userProfile));
  }

  render() {
    let { loading } = this.state;
    let user = this.props.userProfile;
    if (loading) {
      return <div>loading</div>;
    } else if (!user) {
      return <div>not logged in</div>;
    }

    return (
      <div className="section profile-heading">
        <div className="columns">
          <div className="column is-4 name">
            <div className="image is-128x128 avatar">
              <img src={user.avatar_url} />
            </div>
            <span className="button is-primary is-outlined follow">Follow</span>
            <p>
              <span className="title is-bold">{user.username}</span>
            </p>
            <p className="tagline">The users profile bio would go here.</p>
            <button onClick={()=> console.log(this.props)}>test </button>
          </div>
          <div className="column is-2 likes has-text-centered">
            <p className="stat-val">29</p>
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
    );
  }
}

const mapStateToProps = state => {
  return { userProfile: state.userProfile };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      storeCurrentUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
