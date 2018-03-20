import React, { Component } from "react";
import io from "socket.io-client";
import Lobby from '../Lobby/Lobby.jsx'
import Chat from '../Chat/Chat.jsx'
import Masher from '../Games/Masher/Masher.jsx'

const games = {
'Masher': Masher

}
export default class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      test: "",
      currRoom: Lobby,
      selectedGame: 'Masher'
    };
   
  }
  async componentWillMount() {

    
    this.socket = await io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });
    await this.setState({ socket: this.socket });
    
    
    this.socket.on('startGameAll', (data)=> {
      
      this.setState({currRoom: games[this.state.selectedGame]})
    })
    // this.socket.on("serverMessage", data => {
    //   this.setState({ test: data });
    // });
  }
  startGame() {
    this.socket.emit('startGameHost', 
    this.state.selectedGame
    )
  this.setState({currRoom: games[this.state.selectedGame]})
  }
  render() {
    return (
      <div>

       < this.state.currRoom socket = {this.state.socket}/>
        <input type="submit" value = 'START' onClick={() => this.startGame()} />
      </div>
    );
  }
}
