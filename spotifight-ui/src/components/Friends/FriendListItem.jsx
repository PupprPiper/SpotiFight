import React, { Component } from 'react';
import {Paper} from './../Global/Material-Globals';
const FriendListItem = ({friend}) => { 
  return   (
      <Paper>
  <article className="media">
  <div className="media-left">
      <figure className="image is-64x64">
          <img src={friend.avatar_url} alt="Image"/>
      </figure>
  </div>
  <div className="media-content">
      <div className="content">
          <p>
              <strong style={{fontSize: '20px'}}>{friend.username}</strong>
              <small style={{float: "right"}}>{friend.status}</small>
              <br/>
              <small>wins: {friend.wins} losses: {friend.losses}</small>
          </p>
      </div>
      <nav className="level">
          <div className="level-left">
              <a className="level-item">
                  <span className="icon is-small">
                      <i className="fa fa-reply"></i>
                  </span>
              </a>
              <a className="level-item">
                  <span className="icon is-small">
                      <i className="fa fa-retweet"></i>
                  </span>
              </a>
              <a className="level-item">
                  <span className="icon is-small">
                      <i className="fa fa-heart"></i>
                  </span>
              </a>
          </div>
      </nav>
  </div>
</article>
</Paper>
)
}

export default FriendListItem;

