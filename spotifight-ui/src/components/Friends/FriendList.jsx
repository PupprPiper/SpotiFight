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
  Checkbox
} from './../Global/Material-Globals';
import { requestFriend, acceptFriend, removeFriend } from './FriendListHelpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateFriends,
  updatePendingFriends,
  updateFilteredUsers,
  updateAllUsers,
  updateSearchInput
} from '../../actions/index';
class FriendList extends Component {
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
    this.props.updateFriends(allFriends.data);
    this.props.updatePendingFriends(pendingFriends.data);
  }

  filterUsers() {
    var filtered = this.props.allUsers.data.filter(user => {
      console.log('USER HERE ', user)
      return user.username
        .toLowerCase()
        .includes(this.props.searchInput.toLowerCase());
    });
    this.props.updateFilteredUsers(filtered);
  }

  render() {
    return (
      <div>
        {console.log('HERE ARE ALL THE PROPS ', this.props)}
        <Grid container spacing={24}>
          <Grid align="center" item xs={6}>
            <h3>Your Friends</h3>
            <List>
              {this.props.friends
                ? this.props.friends.map((friend, i) => {
                    return (
                      <ListItem key={i}>
                        {friend.username}
                        <button
                          onClick={() => {
                            removeFriend(this.props.userProfile.id, friend.id);
                            this.fetchAllFriends();
                          }}>
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
              {this.props.pendingFriends
                ? this.props.pendingFriends.map((friend, i) => {
                    return (
                      <ListItem key={i}>
                        {friend.username}
                        <button
                          onClick={() => {
                            acceptFriend(this.props.userProfile.id, friend.id);
                            this.fetchAllFriends();
                          }}>
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            removeFriend(this.props.userProfile.id, friend.id);
                            this.fetchAllFriends();
                          }}>
                          Reject
                        </button>
                      </ListItem>
                    );
                  })
                : null}
            </List>
          </Grid>
          <Grid align="center" item xs={6}>
            <input
              type="text"
              onChange={async e => {
                console.log('SEARCH VAL HERE ', e.target.value)
                await this.props.updateSearchInput(e.target.value);
                console.log('SEARCH INPUT HERE', this.props.searchInput)
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
                        onClick={() =>
                          requestFriend(this.props.userProfile.id, user.id)
                        }
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
