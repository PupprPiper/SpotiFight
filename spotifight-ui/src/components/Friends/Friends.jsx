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

  async addFriend() {
    var allUsers =  await axios.get('http://localhost:3000/users/fetchAllUsers');
    console.log('ALL USERS HERE ', allUsers)
    var user = allUsers.data.filter(user => user.username === this.state.input);
    console.log('FILTERED USER HERE ', user)
    if(user.id){
      var body = {
        user_id: this.state.user_id,
        friend_id: user.id
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
