import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
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
    var allFriends = await axios.get(
      `/friends/fetchAllFriends/${this.props.userProfile.id}`
    );
    var pendingFriends = await axios.get(
      `/friends/fetchAllPendingFriends/${this.props.userProfile.id}`
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
    var allUsers = await axios.get('/users/fetchAllUsers');
    this.props.updateAllUsers(allUsers);
    this.fetchAllFriends();
    this.props.updateSearchInput('');
    this.props.updateFilteredUsers(null);
  }

  render() {
    return ( 
      <div className="allTables">
        <div className="friend-table">
          <h3 className="friend-head"> Friends </h3>
          <table>
            <thead>
              <tr>
                <th className="friends">Avatar</th>
                <th className="friends">Username</th>
                <th className="friends">Wins</th>
                <th className="friends">Losses</th>
                <th className="friends">Delete?</th>
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

        <div className="pendingFriend-table">
          <h3 className="friend-head"> Friend Requests </h3>
          <table>
            <thead>
              <tr>
                <th className="friends">Avatar</th>
                <th className="friends">Username</th>
                <th className="friends">Accept?</th>
                <th className="friends">Reject?</th>
              </tr>
            </thead>
            {this.props.pendingFriends
              ? this.props.pendingFriends.map((friend, i) => {
                  return (
                    <PendingFriendListItem
                      key={i}
                      fetchAllFriends={this.fetchAllFriends}
                      friend={friend}
                    />
                  );
                })
              : null}
          </table>
        </div>
        <div className="search">
          <h3 className="friend-head"> Search </h3>
          <form>
            <input
              className="searchForm"
              type="text"
              placeholder="Search friends..."
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
          </form>
          {this.props.filteredUsers
            ? this.props.filteredUsers.map((user, i) => {
                return (
                  <SearchListItem
                    key={i}
                    fetchAllFriends={this.fetchAllFriends}
                    user={user}
                  />
                );
              })
            : null}
        </div>
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
