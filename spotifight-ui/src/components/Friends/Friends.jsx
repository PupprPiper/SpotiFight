<<<<<<< HEAD
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
<<<<<<< HEAD
import Verify from '../Auth/Verify.jsx';
=======
import Grid from "material-ui/Grid";
>>>>>>> changed up friends page
=======
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
<<<<<<< HEAD
>>>>>>> implemeting update user profile functionality
=======
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Avatar,
  Checkbox
} from "./../Global/Material-Globals";
<<<<<<< HEAD

>>>>>>> saving progress
=======
import FriendList from './FriendList';
>>>>>>> refactoring
class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      friends: [],
      pendingFriends: [],
      input: '',
      allUsers: null,
      filteredUsers: null
    };
  }

  async requestFriend(i) {
    var body = {
      user_id: this.props.userProfile.id,
      friend_id: this.state.filteredUsers[i].id
    };
    await axios.post('http://localhost:3000/friends/requestFriend', body);
    this.fetchAllFriends();
    this.setState({ input: '' });
  }

  async acceptFriend(friendId) {  
    var body = {
      user_id: this.props.userProfile.id,
      friend_id: friendId
    };
    await axios.put('http://localhost:3000/friends/acceptFriend', body);
    this.fetchAllFriends();
  }

  async fetchAllFriends() {
    var allFriends = await axios.get(
      `http://localhost:3000/friends/fetchAllFriends/${
        this.props.userProfile.id
      }`
    );
    var pendingFriends = await axios.get(
      `http://localhost:3000/friends/fetchAllPendingFriends/${
        this.props.userProfile.id
      }`
    );
    this.setState({
      friends: allFriends.data,
      pendingFriends: pendingFriends.data
    });
  }

  async removeFriend(friendId) {
    var body = {
      data: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        user_id: this.props.userProfile.id,
        friend_id: this.state.friends[i].id
=======
        user_id: this.props.userProfile.id, 
=======
        // user_id: this.props.userProfile.id, 
>>>>>>> bugs
=======
        user_id: this.props.userProfile.id, 
>>>>>>> saving progress
=======
        user_id: this.props.userProfile.id,
>>>>>>> code cleanup
=======
        user_id: this.props.userProfile.id, 
>>>>>>> changed up friends page
=======
        user_id: this.props.userProfile.id,
>>>>>>> implemeting update user profile functionality
        friend_id: friendId
>>>>>>> friend requests/adds should work
      }
    };
    await axios.delete(
      `http://localhost:3000/friends/deleteFriend/${
        this.props.userProfile.id
      }/${friendId}`,
      body
    );
    this.fetchAllFriends();
  }

  filterUsers() {
    var filtered = this.state.allUsers.filter(user => {
      return user.username
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
    });
    this.setState({ filteredUsers: filtered });
  }

  async componentDidMount() {
    var allUsers = await axios.get('http://localhost:3000/users/fetchAllUsers');
    this.setState({ allUsers: allUsers.data });
    this.fetchAllFriends();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={async e => {
            await this.setState({ input: e.target.value });
            if (this.state.input.length > 2) {
              this.filterUsers();
            } else {
              this.setState({ filteredUsers: null });
            }
          }}
        />
        <h5>Search Results</h5>
        {this.state.filteredUsers
          ? this.state.filteredUsers.map((user, i) => {
              return (
                <div key={i}>
                  <li>{user.username}</li>
                  <button onClick={() => this.requestFriend(i)}>Request</button>
                </div>
              );
            })
          : null}
        <Grid container spacing={24}>
<<<<<<< HEAD
          <Grid align="center" item xs={6}>
            <h3>Your Friends</h3>
<<<<<<< HEAD

<<<<<<< HEAD
        <ul>
          {this.state.friends ? this.state.friends
          .map((friend, i) => {
            return (
              <div key={i} index={i}>
                <li>{friend.username}</li>
                <button onClick={() => this.removeFriend(friend.id)}>Remove Friend</button>
              </div>
            );
          }): null}
        </ul>
<<<<<<< HEAD
<<<<<<< HEAD
              <Verify  />
=======

=======
        </Grid>
        <Grid align="center" item xs={6}>
>>>>>>> changed up friends page
        <h3>Pending Friend Requests</h3>
        <ul>
          {this.state.pendingFriends ? this.state.pendingFriends
          .map((friend, i) => {
            return (
              <div key={i} index={i}>
                <li>{friend.username}</li>
                <button onClick={() => this.acceptFriend(friend.id)}>Accept</button>
                <button onClick={() => this.removeFriend(friend.id)}>Reject</button>
              </div>
            );
          }): null}
        </ul>
<<<<<<< HEAD
<<<<<<< HEAD

>>>>>>> friend requests/adds should work
=======
>>>>>>> code cleanup
=======
        </Grid>
</Grid>
>>>>>>> changed up friends page
=======
            <ul>
=======
          <List>
>>>>>>> saving progress
              {this.state.friends
                ? this.state.friends.map((friend, i) => {
                    return (
                        <ListItem>{friend.username}
                        <button onClick={() => this.removeFriend(friend.id)}>
                          Remove Friend
                        </button>
                        </ListItem>
                    );
                  })
                : null}
          </List>
          </Grid>
          <Grid align="center" item xs={6}>
            <h3>Pending Friend Requests</h3>
          <List>
              {this.state.pendingFriends
                ? this.state.pendingFriends.map((friend, i) => {
                    return (
                      <ListItem>
                        <li>{friend.username}</li>
                        <button onClick={() => this.acceptFriend(friend.id)}>
                          Accept
                        </button>
                        <button onClick={() => this.removeFriend(friend.id)}>
                          Reject
                        </button>
                        </ListItem>
                    );
                  })
                : null}
            </List>
          </Grid>
=======
            <FriendList />
>>>>>>> refactoring
        </Grid>
>>>>>>> implemeting update user profile functionality
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile
  };
};

export default connect(mapStateToProps)(Friends);
