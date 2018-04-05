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
import {
  requestFriend,
  acceptFriend,
  removeFriend,
  rejectFriend
} from './FriendListHelpers';
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
import SearchListItem from './SearchListItem.jsx';
import axios from 'axios';

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchAllFriends = this.fetchAllFriends.bind(this);
  }

  async fetchAllFriends() {
    console.log('PROPS FROM FRIEND LIST ', this.props);
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
        <Grid style={{ marginTop: '5%' }} container spacing={24}>
          <Grid align="center" item xs={12} md={4}>
            <div className="friend-table top-margin">
              <h3 className="friend-head"> Friends </h3>
              <table align="left" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Delete?</th>
                  </tr>
                </thead>
                {this.props.friends
                  ? this.props.friends.map((friend, i) => {
                      return (
                        <FriendListItem
                          key={i}
                          fetchAllFriends={this.fetchAllFriends}
                          friend={friend}
                        />
                      );
                    })
                  : null}
              </table>
            </div>
          </Grid>
          <Grid align="center" item xs={12} md={4}>
            <h3>Pending Friend Requests</h3>
            <List>
              {this.props.pendingFriends
                ? this.props.pendingFriends.map((friend, i) => {
                    return (
                      <Paper key={i}>
                        <PendingFriendListItem
                          fetchAllFriends={this.fetchAllFriends}
                          friend={friend}
                        />
                      </Paper>
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
                    <SearchListItem
                      fetchAllFriends={this.fetchAllFriends}
                      user={user}
                    />
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

{
  /* 
<div>
<Grid style={{marginTop: '5%'}} container spacing={24}>
  <Grid align="center" item xs={12} md={4}>
    <h3>Your Friends</h3>
     <List>
      {this.props.friends
        ? this.props.friends.map((friend, i) => {
            return (
              <Paper key={i} >
              <FriendListItem fetchAllFriends={this.fetchAllFriends} friend={friend}/>
              </Paper>
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
              <Paper key={i}>
              <PendingFriendListItem fetchAllFriends={this.fetchAllFriends} friend={friend}/>
              </Paper>
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
            <SearchListItem fetchAllFriends={this.fetchAllFriends} user={user}/>
          );
        })
      : null}
  </Grid>
</Grid>
</div> */
}
