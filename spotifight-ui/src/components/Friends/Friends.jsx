import React, { Component } from 'react';
import axios from 'axios';
export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      friends: [],
      input: ''
    };
  }

  addFriend() {
    var allUsers =  axios.get('http://localhost:3000/friends/fetchAllUsers');
    var user = allUsers.data.rows.filter(user => user.username === this.state.input);
    if(user[0].id){
      var body = {
        user_id,
        friend_id: user[0].id
      }
      axios.post('http://localhost:3000/friends/addFriend', body)
    }
    this.fetchAllFriends();
  }

  fetchAllFriends () {
    var allFriends =  axios.get(`http://localhost:3000/friends/fetchAllFriends/${this.state.user_id}`)
    this.setState({friends: allFriends.data})
  }

  componentDidMount() {
    // this.fetchAllFriends()
  }

  render() {
    return <div>
      <input type='text' onChange={(e) => this.setState({input: e.target.value})}/>
      
      <input type="submit" value="Add Friend" onClick={() => this.addFriend()}/>
      </div>;
  }
}
