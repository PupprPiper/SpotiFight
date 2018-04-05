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
import './FriendList.scss';

class FriendListItem extends Component {
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
          <td>{this.props.friend.wins}</td>
          <td>{this.props.friend.losses}</td>
          <td align="center">
            <button
              onClick={async () => {
                await removeFriend(
                  this.props.userProfile.id,
                  this.props.friend.id
                );
                this.props.fetchAllFriends();
              }}
              className="btn"
              type="button"
            >
              Delete
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendListItem);

//     <div className="friend-table top-margin">
// <h3 className="friend-head"> Friends </h3>
//   <table align="center" style={{ width: "40%" }}>
//   <thead>
//   <tr>
//     <th>Avatar</th>
//     <th>Username</th>
//     <th>Wins</th>
//     <th>Losses</th>
//   </tr>
// </thead>
//   <article className="media">
//     <div className="media-left">
//       <figure className="image is-64x64">
//         <img src={this.props.friend.avatar_url} alt="Image" />
//       </figure>
//     </div>
//     <div className="media-content">
//       <div className="content">
//         <p>
//           <strong style={{ fontSize: '20px' }}>{this.props.friend.username}</strong>
//           <small style={{ float: 'right' }}>{this.props.friend.status}</small>
//           <br />
//           <small>
//             wins: {this.props.friend.wins} losses: {this.props.friend.losses}
//           </small>
//         </p>
//           <Button variant="raised" color="primary"
//             onClick={async () => {
//               await removeFriend(this.props.userProfile.id, this.props.friend.id);
//               this.props.fetchAllFriends();
//             }}
//           >
//             Remove Friend
//           </Button>
//       </div>
//       <nav className="level">
//         <div className="level-left">
//           <a className="level-item">
//             <span className="icon is-small">
//               <i className="fa fa-reply" />
//             </span>
//           </a>
//           <a className="level-item">
//             <span className="icon is-small">
//               <i className="fa fa-retweet" />
//             </span>
//           </a>
//           <a className="level-item">
//             <span className="icon is-small">
//               <i className="fa fa-heart" />
//             </span>
//           </a>
//         </div>
//       </nav>
//     </div>
//   </article>
