import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import randomstring from "randomstring";


export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      game: "testgame",
      roomsOpen: {},
      roomName: null
    }
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
  render() {
    return (
      <div>
        {console.log(this.props)}
        Hello from Home
        <input
          type="text"
          value=""
        />
        <input
          type="submit"
          value="CREATE"
          onClick={() => this.handleGameRoomRedirect()}
        />
      </div>
    );
  }
}
