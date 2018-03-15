import React, { Component } from "react";
import io from "socket.io-client";



export default class GameRoom extends Component {

  constructor(props){
    super(props)
    this.state = {

    }

  }
  componentDidMount (){
      io('http://localhost:8000')
  }
  render() {
    return <div>Hello from GameRoom

      
    </div>;
  }
}
