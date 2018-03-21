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
    this.setState({
      loading: true
    });
    this.getUser(email);
  }

  async getUser(email) {
    let user = await axios.get(`/users/email/${email}`);
    console.log(user.data);
    this.props.storeCurrentUser(user.data);
    this.setState({ loading: false, user: user.data });
  }

  render() {
    const { loading, user } = this.state;
    if (this.state.loading) {
      return <div>loading</div>;
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
