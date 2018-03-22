import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography
} from 'material-ui';

import { storeCurrentUser } from './../../actions/index';
import './UserProfile.scss';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {}
    };
  }

  componentDidMount() {
    let email = this.props.location.pathname.match(/\w+@\w+.\w+/)[0];
    console.log(email);
    this.setState({
      loading: true
    });
    this.getUser(email);
  }

  async getUser(email) {
    let payload = await axios.get(`/users/email/${email}`);
    this.props.storeCurrentUser(payload.data.userProfile);
    this.setState({ loading: false, user: payload.data.userProfile });
    localStorage.setItem('token', payload.data.token);
    localStorage.setItem('user', payload.data.userProfile);
    console.log(localStorage);
  }

  render() {
    let { loading } = this.state;
    let user = this.props.userProfile;
    if (this.state.loading) {
      return <div>loading</div>;
    }

    if (!user) {
      return <div>not logged in</div>;
    }

    return (
      <div>
        <Card>
          <CardHeader avatar={<img src={user.avatar_url} alt="..." />} />
          <CardContent>
            <Typography component="h6">{user.email}</Typography>
            <Typography component="h4">{user.username}</Typography>
            <Typography component="p">
              wins: {user.wins} losses: {user.losses}
            </Typography>
          </CardContent>
          <CardActions>footer here</CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ storeCurrentUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
