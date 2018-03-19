import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import randomstring from "randomstring";
import io from "socket.io-client";
import Button from "material-ui/Button";

let randomRoom;
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      socket: null
      // roomName: null
    };
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
        <div>Select a game</div>
        <Button variant="raised" color = 'secondary' onClick={() => this.handleGameRoomRedirect()}>
          CREATE A NEW GAME ROOM
        </Button>
      </div>
    );
  }
}
