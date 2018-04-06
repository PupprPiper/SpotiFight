import React, { Component } from 'react';
import {Button} from './../Global/Material-Globals';
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

class SearchListItem extends Component {
    constructor(props){
        super(props)
    }
    render(){

        return (
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={this.props.user.avatar_url} alt="Image" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p class="searchItem">
                  <strong style={{ fontSize: '20px' }}>{this.props.user.username}</strong>
                  <small style={{ float: 'right' }}>{this.props.user.status}</small>
                  <br />
                  <small>
                    wins: {this.props.user.wins} losses: {this.props.user.losses}
                  </small>
                </p>
                  <Button variant="raised" color="primary"
                    onClick={async () => {
                      if(this.props.userProfile.id !== this.props.user.id){
                        await requestFriend(this.props.userProfile.id, this.props.user.id);
                        this.props.fetchAllFriends();
                      }else{
                        console.log('Can\'t add self as friend')
                      }
                    }}
                  >
                     Send Friend Request
                  </Button>
              </div>
              <nav className="level">
                <div className="level-left">
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fa fa-reply" />
                    </span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fa fa-retweet" />
                    </span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fa fa-heart" />
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        );
      };
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

  export default connect(mapStateToProps, mapDispatchToProps)(SearchListItem);
