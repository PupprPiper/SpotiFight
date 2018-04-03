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
} from "./../Global/Material-Globals";
import {requestFriend, acceptFriend, removeFriend} from './FriendListHelpers'
const FriendList = ({friends, pendingFriends, filteredUsers, input}) =>  { 
  
  return (<div>
    <Grid container spacing={24}>
 <Grid align="center" item xs={6}>
    <h3>Your Friends</h3>
    <List>
      {friends
        ? friends.map((friend, i) => {
            return (
                <ListItem key={i}>{friend.username}
                {/* <button onClick={() => this.removeFriend(friend.id)}>
                  Remove Friend
                </button> */}
                </ListItem>
            );
          })
        : null}
    </List>
    </Grid>
    <Grid align="center" item xs={6}>
    <h3>Pending Friend Requests</h3>
    <List>
      {pendingFriends
        ? pendingFriends.map((friend, i) => {
            return (
              <ListItem key={i}>
                {friend.username}
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
    <Grid align="center" item xs={6}>
            <input
              type="text"
              onChange={async e => {
                await this.setState({ input: e.target.value });
                if (input.length > 2) {
                  this.filterUsers();
                } else {
                  this.setState({ filteredUsers: null });
                }
              }}
            />
            <h5>Search Results</h5>
            {filteredUsers
              ? filteredUsers.map((user, i) => {
                  return (
                    <div key={i}>
                      <li>{user.username}</li>
                      <button onClick={() => this.requestFriend(i)}>
                        Request
                      </button>
                    </div>
                  );
                })
              : null}
          </Grid>
    </Grid>

  </div>)

}


export default FriendList;