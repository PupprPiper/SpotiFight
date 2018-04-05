import React, { Component } from "react";
import FriendList from './FriendList.jsx'
import Verify from '../Auth/Verify.jsx';
import './FriendList.scss';
class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div>
        <FriendList/>
        <Verify  />
      </div>
    );
  }
}



export default Friends;
