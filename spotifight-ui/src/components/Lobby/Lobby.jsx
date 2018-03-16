import React, { Component } from 'react';
import io from "socket.io-client";

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {socket: ''}
  }
  componentDidMount() {
    this.socket = io.connect("http://localhost:8000");
    this.setState({socket: this.socket})
  }
  render() {
    return <div>Hello from Lobby</div>;
  }
}
