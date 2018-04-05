import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {Grid, Button} from './../Global/Material-Globals';
import './Background.scss';
import $ from 'jquery';
import Dialog from 'material-ui/Dialog';
import './UserProfile.scss'
import UserParticle from '../Games/Masher/particles/Particles.jsx'


import {storeCurrentUser} from './../../actions/index';

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
      statusInput: '',
      open:false,
      _mounted: false
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

componentDidMount() {
    // listener for modal black space click
    this.setState({loading: true});
    this.setState({_mounted: true})

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
    this.getUser(email);


  }

  async getUser(email) {
    try {
      let payload = await axios.get(`/users/email/${email}`);
      payload.data.userProfile.avatar_url = payload.data.userProfile.avatar_url + '0';
      await this.props.storeCurrentUser(payload.data.userProfile);

      await this.setState({loading: false, user: payload.data.userProfile});
      localStorage.setItem('token', payload.data.token);
      localStorage.setItem('user', JSON.stringify(payload.data.userProfile));
    } catch (err) {
      console.log(err, 'error in getUser--> Userprofile')
    }
  }

  setTextField(e) {
    var obj = {};
    obj[e.target.name] = e.target.value
    console.log('OBJ HERE ', obj)
    this.setState(obj)
    console.log(this.state)
  }

  async updateInfo() {
    if (this.state.usernameInput) {
      await axios.put('http://localhost:3000/users/updateInfo', {
        field: 'username',
        info: this.state.usernameInput,
        user_id: this.props.userProfile.id
      })
    }
    if (this.state.avatarInput) {
      await axios.put('http://localhost:3000/users/updateInfo', {
        field: 'avatar_url',
        info: this.state.avatarInput,
        user_id: this.props.userProfile.id
      })
    }
    if (this.state.statusInput) {
      await axios.put('http://localhost:3000/users/updateInfo', {
        field: 'status',
        info: this.state.statusInput,
        user_id: this.props.userProfile.id
      })
    }
    this.getUser(this.state.user.email);
    await this.setState({usernameInput: '', avatarInput: '', statusInput: ''})

  }
  render() {
    let {loading} = this.state;
    const user = this.props.userProfile;
    if (loading) { return (<div> loading  </div>)}
    else if (!user) {
      return (<div>
        not logged-in
      </div>);
    }

    const actions = [
      <Button
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <Button
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ]

    return (


      <div className="section profile-heading">
      <div id="particle-div">
  {this.state._mounted ? <UserParticle userProfile={this.props.userProfile}/> : ''}
      </div>
      <div className="columns">
        <div className="column is-4 name">
          <div className="image is-128x128 avatar">
            <img src={user.avatar_url}/>
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
          <Button variant="raised" color="primary" className="primary" label="Dialog" onClick={this.handleOpen}>
            Update Info
          </Button>

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
        <div>

          <Dialog title="Dialog With Actions" actions={actions} modal="false" open={this.state.open} onBackdropClick={this.handleClose}>
            <div className="content user-modal">
              <h3>Username</h3>
              <div className="field">
                <div className="control">
                  <input type="text" className="input is-medium" name="usernameInput" value={this.state.usernameInput} onChange={e => this.setTextField(e)}/>
                </div>
              </div>

              <h3>
                Avatar
              </h3>

              <div className="field">
                <div className="control">
                  <input type="text" name="avatarInput" className="input is-medium" value={this.state.avatarInput} onChange={e => this.setTextField(e)}/>
                </div>
              </div>

              <h3>
                Status
              </h3>

              <div className="field">
                <div className="control">
                  <input type="text" name="statusInput" className="input is-medium" value={this.state.statusInput} onChange={e => this.setTextField(e)}/>
                </div>
              </div>

              <Button align="center" variant="raised" color="primary" className="primary" onClick={() => {
                  this.updateInfo();
                  this.handleClose()
                }}>Save</Button>
            </div>
          </Dialog>
        </div>
      </div>

    </div>
);
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
