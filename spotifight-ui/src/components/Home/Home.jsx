import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import randomstring from "randomstring";
import io from "socket.io-client";

let randomRoom;
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      // roomName: null
    }
  }
  componentDidMount() {
    // this.socket = io.connect("http://localhost:8000")
    // this.setState({ socket: this.socket });
  }

  randomRoom() {
    randomRoom = `${randomstring.generate()}`;
  }
  handleGameRoomRedirect() {
    this.randomRoom();
    // this.socket = io.connect("http://localhost:8000", {
    //     query: {
    //       roomId: randomRoom
    //     }
    //   })
    //   this.setState({ socket: this.socket });
    

    
    this.props.history.push({
      pathname: `/game-room/${randomRoom}`,
      state: { game: this.state.game }
    });
    
  }

  // joinRoom(){
  //     // this.socket.emit('joinRoom', this.state.roomName)
  //     this.socket = io.connect("http://localhost:8000", {
  //       query: {
  //         roomName: this.state.roomName
  //       }
  //     })
  //     this.setState({ socket: this.socket });
  //     this.props.history.push({pathname: '/'})
    
  //   }
  render() {
    return (
      <div>

        {console.log(this.props.location)}
        {/* {console.log(this.props)} */}
        Hello from Home
        {/* <input
          id='join'
          type="text"
          onChange={(e) => this.setState({roomName: e.target.value})}
        /> */}
        <input
          type="submit"
          value="CREATE A NEW ROOM"
          onClick={() => this.handleGameRoomRedirect()}
        />
      </div>
    );
  }
}
