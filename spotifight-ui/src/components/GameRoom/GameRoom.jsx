import React, { Component } from "react";
import io from "socket.io-client";
import Lobby from "../Lobby/Lobby.jsx";
import Chat from "../Chat/Chat.jsx";
import Masher from "../Games/Masher/Masher.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import players from "../Games/Masher/seed.js";
import Grid from "material-ui/Grid";
import { gameSwitch, songSwitch } from "../../actions/index";
import Button from "material-ui/Button";
import MusicTrivia from "../Games/MusicTrivia/MusicTrivia";
import RPSLS from "../Games/RPSLS/rpsls.jsx";

const mapStateToProps = function(state) {
  return {
    game: state.game,
    mySong: state.mySong,
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ gameSwitch, songSwitch }, dispatch);
};

const games = {
  Lobby: Lobby,
  Masher: Masher,
  MusicTrivia: MusicTrivia,
  RPSLS: RPSLS
};
class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      test: "",
      currRoom: Lobby,
      players: [],
      socketID: "",
      localUser: this.props.userProfile.username,
      userImg:
        "https://lh3.googleusercontent.com/-tcP7CBn3lpg/Tg15KKkK6pI/AAAAAAAAABQ/Hph0kqR-hKU/w530-h530-n-rw/photo.jpg",
      winner: "",
      globalSong: null,
      host: null,
      leftPlayers: [],
      rightPlayers: []
    };

    this.getWinner = this.getWinner.bind(this);
  }
  async componentWillMount() {
    this.socket = await io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });

    await this.setState({ socket: this.socket });

    this.state.socket.emit("USER_ENTER_LOBBY", this.props.userProfile);

    this.socket.on("ACTIVE_USERS", data => {
      console.log("this is the active users", data);

      this.setState({ players: data });
      this.setState({host: this.state.players[0].username})
      let left = this.state.players.filter((item,index)=>{
        if(index %2 ===0 || index ===0){
         return item
       }
     })
     let right = this.state.players.filter((item,index)=>{
      if(index %2 ===1){
       return item
     }
   })
     console.log('left', left)
     this.setState({
       leftPlayers: left,
       rightPlayers: right
     })
  
    });



    this.socket.on("startGameAll", data => {
      this.setState({ currRoom: games[data] });
    });

    this.state.socket.on("finalScoreObject", finalScore => {
      var winner = this.getWinner(finalScore);
      this.setState({ winner: winner });
      this.state.socket.emit("broadcastWinner", winner);
        this.state.socket.emit('clearBoard', {})
      console.log("this is the winner", winner);
      if (this.state.localUser === winner[0]) {
        this.state.socket.emit("SEND_WINNER_SONG", this.props.mySong);
      }
    });

    this.state.socket.on("GLOBAL_SONG", song => {
      this.setState({ globalSong: song });
    });

  }
  componentDidMount(){


  }

  startGame() {
    this.socket.emit("startGameHost", this.props.game);
    this.setState({ currRoom: games[this.props.game] });
  }
  lobbyReturn(){
    this.setState({currRoom: Lobby})
  }
  getWinner(final) {
    // console.log(final, "in final score");
    let values = Object.entries(final);
    values = values.sort((a, b) => {
      return b[1] - a[1];
    });
    // console.log(values[0], "<------HERE IS YOUR WINNER");
    return values[0];
  }

  render() {
    return (
      <div>

        <audio src={this.state.globalSong} autoPlay />
        <this.state.currRoom
          socket={this.state.socket}
          userImg={this.state.userImg}
          localUser={this.state.localUser}
          winner={this.state.winner}
          players={this.state.players}
          host = {this.state.host}
          leftPlayers = {this.state.leftPlayers}
          rightPlayers = {this.state.rightPlayers}
        />
        <Grid container>
          <Grid item md={5} />

          <Grid item md={2}>
            {this.props.game=== null ? null : (
              <div align='center'> 
              <Button
                variant="raised"
                color="secondary"
                onClick={() => this.startGame()}
                
              >
                START GAME
              </Button>
              </div>
            )}
            {this.state.currRoom === Lobby ? null :

            <Button
            variant="raised"
            color="secondary"
            onClick={() => this.lobbyReturn()}
          >
            RETURN TO LOBBY
          </Button>
            }


          </Grid>
        </Grid>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
