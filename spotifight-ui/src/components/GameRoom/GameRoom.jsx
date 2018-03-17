import React, { Component } from "react";
import io from "socket.io-client";
import Lobby from '../Lobby/Lobby.jsx'
import Chat from '../Chat/Chat.jsx'

export default class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      test: "",
      currRoom: Lobby,
    };
   
  }
  componentDidMount() {
    this.socket = io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });
    this.setState({ socket: this.socket });
    
    
    this.socket.on('startGameAll', (data)=> {

      this.setState({currRoom: data})
    })
    // this.socket.on("serverMessage", data => {
    //   this.setState({ test: data });
    // });
  }
  startGame() {
    this.socket.emit('startGameHost', ()=> {
      
    })
  
  }
  render() {
    return (
      <div>

       < this.state.currRoom/>
        <input type="submit" value = 'START' onClick={() => this.startGame()} />
      </div>
    );
  }
}
