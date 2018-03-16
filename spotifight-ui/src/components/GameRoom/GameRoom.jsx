import React, { Component } from "react";
import io from "socket.io-client";

export default class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      test: ''
    };
    this.clickButton = this.clickButton.bind(this);
  }
  componentDidMount() {
  //   this.socket = io.connect("http://localhost:8000");
  //   this.setState({socket: this.socket})
  //   this.socket.emit('message', { message: "TESTINGGGGG" });
  //   this.socket.on('serverMessage', data => {
  //     this.setState({test: data})
    // })
  }
  clickButton(e){
    console.log('CLICK WORKED')
    this.socket.emit('message', document.getElementById('test').value)
  }
  render() {
    return (
      
      <div>
        {console.log('TEST HERE ', this.state.test)}
      Hello from GameRoom
      <input id="test" type="text"/>
      {/* <input type="submit" onClick={() => this.clickButton()}/> */}
      </div>
    )
  }
}
