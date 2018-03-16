import React, { Component } from "react";
import io from "socket.io-client";


export default class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      test: ""
    };
    this.clickButton = this.clickButton.bind(this);
  }
  componentDidMount() {
    this.socket = io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });
    this.setState({ socket: this.socket });
    
    this.socket.on("serverMessage", data => {
      this.setState({ test: data });
    });
  }
  clickButton(e) {
    console.log("CLICK WORKED");
    this.socket.emit("message", document.getElementById("test").value);
  }
  render() {
    return (
      <div>
        {console.log("gameroom props", this.props)}
        {console.log(this.props.location.pathname.slice(11))}
        Hello from GameRoom
        <input id="test" type="text" />
        <input type="submit" onClick={() => this.clickButton()} />
      </div>
    );
  }
}
