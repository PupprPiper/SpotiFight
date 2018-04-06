import React, { Component } from 'react';
import { Button } from './../Global/Material-Globals';
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

class PendingFriendListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tbody>
        <tr>
          <td>
            <img
              src={this.props.friend.avatar_url}
              alt="avatar"
              width="50"
              height="50"
              className="table-img"
            />
          </td>
          <td>{this.props.friend.username}</td>
          <td align="center">
            <button
              onClick={async () => {
                await acceptFriend(
                  this.props.userProfile.id,
                  this.props.friend.id
                );
                this.props.fetchAllFriends();
              }}
              className="btn"
              type="button"
            >
              Accept
            </button>
          </td>
          <td align="center">
            <button
              onClick={async () => {
                await rejectFriend(
                  this.props.userProfile.id,
                  this.props.friend.id
                );
                this.props.fetchAllFriends();
              }}
              className="btn"
              type="button"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  PendingFriendListItem
);