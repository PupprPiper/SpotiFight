import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
class Friends extends Component {
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
    var friend = allUsers.data.filter(user => user.username === this.state.input);
    console.log('FILTERED USER HERE ', friend)
    if(friend.length > 0 && friend[0].id){
      var body = {
        user_id: this.props.userProfile.id,
        friend_id: friend[0].id
      }
      console.log('BODY HERE ', body)
      axios.post('http://localhost:3000/friends/addFriend', body)
    }
    this.fetchAllFriends();
  }

  async fetchAllFriends () {
    var allFriends =  await axios.get(`http://localhost:3000/friends/fetchAllFriends/${this.props.userProfile.id}`)
    this.setState({friends: allFriends.data})
  }

  componentDidMount() {
    this.fetchAllFriends()
  }

  render() {
    return <div>
      <input type='text' onChange={(e) => this.setState({input: e.target.value})}/>
      <input type="submit" value="Add Friend" onClick={() => this.addFriend()}/>
      
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile
  };
};


export default connect(mapStateToProps)(Friends);