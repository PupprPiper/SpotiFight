import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import randomstring from "randomstring";
import io from "socket.io-client";


export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      // game: "testgame",
      // roomsOpen: {},
      roomName: null
    }
  }
  componentDidMount() {
    // this.socket = io.connect("http://localhost:8000")
    // this.setState({ socket: this.socket });
  }

  // randomRoom() {
  //   randomRoom = `${randomstring.generate()}`;
  // }
  handleGameRoomRedirect() {
    // this.randomRoom();
    // this.props.history.push({
    //   pathname: `/game-room/${randomRoom}`,
    //   state: { game: this.state.game }
    // });
    
  }

  joinRoom(){
      // this.socket.emit('joinRoom', this.state.roomName)
      this.socket = io.connect("http://localhost:8000", {
        query: {
          roomName: this.state.roomName
        }
      })
      this.setState({ socket: this.socket });
      this.props.history.push({pathname: '/chat'})
    
    }
  render() {
    return (
      <div>
        {/* {console.log(this.props)} */}
        Hello from Home
        <input
          id='join'
          type="text"
          onChange={(e) => this.setState({roomName: e.target.value})}
        />
        <input
          type="submit"
          value="JOIN"
          onClick={() => this.joinRoom()}
        />
      </div>
    );
  }
}
