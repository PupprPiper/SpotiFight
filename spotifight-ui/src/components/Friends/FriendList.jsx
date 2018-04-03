import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Avatar,
  Checkbox,
  Paper
} from './../Global/Material-Globals';
import { requestFriend, acceptFriend, removeFriend, rejectFriend } from './FriendListHelpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateFriends,
  updatePendingFriends,
  updateFilteredUsers,
  updateAllUsers,
  updateSearchInput
} from '../../actions/index';
import FriendListItem from './FriendListItem.jsx';
import PendingFriendListItem from './PendingFriendListItem.jsx';
import axios from 'axios';

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchAllFriends = this.fetchAllFriends.bind(this);
  }

  async fetchAllFriends() {
    console.log('PROPS FROM FRIEND LIST ', this.props)
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
    this.props.updateFriends(allFriends.data);
    this.props.updatePendingFriends(pendingFriends.data);
  }

  filterUsers() {
    var filtered = this.props.allUsers.data.filter(user => {
      return user.username
        .toLowerCase()
        .includes(this.props.searchInput.toLowerCase());
    });
    this.props.updateFilteredUsers(filtered);
  }

  async componentDidMount() {
    var allUsers = await axios.get('http://localhost:3000/users/fetchAllUsers');
    this.props.updateAllUsers(allUsers);
    this.fetchAllFriends();
    this.props.updateSearchInput('');
    this.props.updateFilteredUsers(null);
  }

  render() {
    return (
      <div>
        <Grid style={{marginTop: '5%'}} container spacing={24}>
          <Grid align="center" item xs={12} md={4}>
            <h3>Your Friends</h3>
             <List>
              {this.props.friends
                ? this.props.friends.map((friend, i) => {
                    return (
                      <Paper>
                      <FriendListItem fetchAllFriends={this.fetchAllFriends} friend={friend}/>
                      </Paper>
                      // <ListItem key={i}>
                      //   {friend.username}
                      //   <button
                      //     onClick={async () => {
                      //       await removeFriend(
                      //         this.props.userProfile.id,
                      //         friend.id
                      //       );
                      //       this.fetchAllFriends();
                      //     }}
                      //   >
                      //     Remove Friend
                      //   </button>
                      // </ListItem>
                    );
                  })
                : null}
            </List>
          </Grid>
          <Grid align="center" item xs={12} md={4}>
            <h3>Pending Friend Requests</h3>
            <List>
              {this.props.pendingFriends
                ? this.props.pendingFriends.map((friend, i) => {
                    return (
                      <Paper>
                      <PendingFriendListItem fetchAllFriends={this.fetchAllFriends} friend={friend}/>
                      </Paper>
                      // <ListItem key={i}>
                      //   {friend.username}
                      //   <button
                      //     onClick={async () => {
                      //       await acceptFriend(
                      //         this.props.userProfile.id,
                      //         friend.id
                      //       );
                      //       this.fetchAllFriends();
                      //     }}
                      //   >
                      //     Accept
                      //   </button>
                      //   <button
                      //     onClick={async () => {
                      //       await rejectFriend(
                      //         this.props.userProfile.id,
                      //         friend.id
                      //       );
                      //       this.fetchAllFriends();
                      //     }}
                      //   >
                      //     Reject
                      //   </button>
                      // </ListItem>
                    );
                  })
                : null}
            </List>
          </Grid>
          <Grid align="center" item xs={12} md={4}>
            <input
              type="text"
              value={this.props.searchInput}
              onChange={async e => {
                await this.props.updateSearchInput(e.target.value);
                if (this.props.searchInput.length > 2) {
                  this.filterUsers();
                } else {
                  this.props.updateFilteredUsers(null);
                }
              }}
            />
            <h5>Search Results</h5>
            {this.props.filteredUsers
              ? this.props.filteredUsers.map((user, i) => {
                  return (
                    <div key={i}>
                      <li>{user.username}</li>
                      <button
                        onClick={async () => {
                          if (this.props.userProfile.id !== user.id) {
                            await requestFriend(
                              this.props.userProfile.id,
                              user.id
                            );
                            this.props.updateSearchInput('');
                            this.props.updateFilteredUsers(null);
                          } else {
                            console.log("Can't add self as friend");
                          }
                        }}
                      >
                        Request
                      </button>
                    </div>
                  );
                })
              : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userProfile: state.userProfile,
    friends: state.friends,
    pendingFriends: state.pendingFriends,
    filteredUsers: state.filteredUsers,
    allUsers: state.allUsers,
    searchInput: state.searchInput
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      updateFriends,
      updatePendingFriends,
      updateFilteredUsers,
      updateAllUsers,
      updateSearchInput
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
