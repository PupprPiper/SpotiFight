import React, { Component } from 'react';
import axios from 'axios'
export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      input: ''
    };
  }

  addFriend() {
    
  }

  render() {
    return <div>
      <input type='text' onChange={(e) => this.setState({input: e.target.value})}/>
      <input type="submit" value="Add Friend" onClick={() => this.addFriend()}/>
      </div>;
  }
}
