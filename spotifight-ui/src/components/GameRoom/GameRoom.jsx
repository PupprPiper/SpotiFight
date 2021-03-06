import React, { Component } from "react";
import io from "socket.io-client";
import Chat from "../Chat/Chat.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import players from "../Games/Masher/seed.js";
import Grid from "material-ui/Grid";
import { gameSwitch, songSwitch, updatePlayers } from "../../actions/index";
import Button from "material-ui/Button";
import { assignLeftPlayer, assignRightPlayer } from "./gameRoomHelpers";

import Lobby from "../Lobby/Lobby.jsx";
import Masher from "../Games/Masher/Masher.jsx";
import MusicTrivia from "../Games/MusicTrivia/MusicTrivia";
import Flappy from "../Games/Flappy/Flappy";
import RPSLS from "../Games/RPSLS/rpsls.jsx";
import PokeballFinderClient from "../Games/PokeballFinder/pokeballFinderClient.jsx";
import Verify from "../Auth/Verify.jsx";
import gameRoomCountdown from "./gameRoomCountdown";
import Confetti from "react-confetti";
import $ from "jquery";
import "./GameRoom.scss";

const games = {
  Lobby: Lobby,
  Masher: Masher,
  MusicTrivia: MusicTrivia,
  RPSLS: RPSLS,
  Flappy: Flappy,
  PokeballFinderClient: PokeballFinderClient
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
      winner: "",
      globalSong: null,
      host: null,
      leftPlayers: [],
      rightPlayers: [],
      counter: "",
      confetti: false,
      counterAll: ""
    };

    this.getWinner = this.getWinner.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startGame = this.startGame.bind(this);
    let gameCount;
  }

  async componentWillMount() {
    try {
    // connect to the socket server
      this.socket = await io.connect(
        "http://localhost:8000",
        {
          query: {
            roomId: this.props.location.pathname.slice(11)
          }
        }
      );
      await this.setState({ socket: this.socket });
      this.state.socket.emit("USER_ENTER_LOBBY", this.props.userProfile);
    //updates everyone's screen to show current players in the room
      this.socket.on("ACTIVE_USERS", data => {
        this.setState({ players: data });
        this.props.updatePlayers(data);
        if (this.state.players.length !== 0) {
          this.setState({ host: this.state.players[0].username });
        }

        let left = assignLeftPlayer(this.state.players);
        let right = assignRightPlayer(this.state.players);

        this.setState({ leftPlayers: left, rightPlayers: right });
      });

      this.socket.on("startGameAll", data => {
        this.setState({ currRoom: games[data] });
      });
    //this code block is part of the Button Masher game...needs to be refactored and put into appropriate file
      this.state.socket.on("finalScoreObject", finalScore => {
        var winner = this.getWinner(finalScore);
        this.setState({ winner: winner });
        this.state.socket.emit("broadcastWinner", winner);
        this.state.socket.emit("clearBoard", {});
        if (this.state.localUser === winner[0]) {
          this.state.socket.emit("SEND_WINNER_SONG", this.props.mySong);
        }
      });
    //when there is a game winner, change everyones chosen song to the winners song and have it autoplay at the end of the game
      this.state.socket.on("GLOBAL_SONG", song => {
        this.setState({ globalSong: song });
        this.setState({ confetti: true });
      });
    // Sends everyone back to lobby 
      this.state.socket.on("RETURN_ALL_TO_LOBBY", data => {
        this.setState({ currRoom: games[data] });
        this.setState({ confetti: false });
      });
    //Kicks everyone out of the lobby when the host closes the window
      this.state.socket.on("QUIT_ALL", data => {
        this.props.history.forced = true;
        this.props.history.push({ pathname: `/home` });
      });

    //Have everyone's counter start at the same time prior to the start of the game
      this.state.socket.on("START_COUNTER_FOR_ALL", data => {
        this.setState({ counter: 3 });
        this.gameCount = setInterval(() => this.countdown(), 1000);
        if (this.state.counter === 0) {
          clearInterval(this.gameCount);
        } else {
          gameRoomCountdown.animate();
        }
      });
      if (this.state.currRoom === Lobby) {
        this.setState({ confetti: false });
      }
    } catch (error) {}
  }

  componentDidMount() {
    $(window).scrollTop(0);
  }

  //When host leaves, everyone is kicked out and the room is deleted, saving memory space
  componentWillUnmount() {
    if (this.state.localUser === this.state.host) {
      this.state.socket.emit(
        "delete_room",
        this.props.location.pathname.slice(11)
      );
    }

    this.state.socket.disconnect();
  }
  componentDidUpdate() {}

  //Starts the game
  startGame() {
    this.state.socket.emit("COUNTER", "");
  }

  //This option is for hosts only, sends everyone back to lobby when button is clicked
  lobbyReturn() {
    this.state.socket.emit("RETURN_TO_LOBBY", "Lobby");
    this.setState({ currRoom: games["Lobby"] });
  }
  //Sets all players global redux state to show who the winner is
  getWinner(final) {
    let values = Object.entries(final);
    values = values.sort((a, b) => {
      return b[1] - a[1];
    });
    return values[0];
  }

  //Starts the countdown
  countdown() {
    if (this.state.counter > 0) {
      this.setState({
        counter: (this.state.counter -= 1)
      });
    }
    if (this.state.counter === 0) {
      if (this.state.localUser === this.state.host) {
        this.socket.emit("startGameHost", this.props.game);
        this.setState({
          currRoom: games[this.props.game]
        });
      }
      this.setState({
        counter: ""
      });
      clearInterval(this.gameCount);
    }
  }

  render() {
    return (
      <div style={{ marginTop: 40 }}>
        <audio src={this.state.globalSong} autoPlay="autoPlay" />
        {this.state.confetti === true ? (
          <Confetti height="1000%" width="2000%" />
        ) : null}
        <div
          align="center"
          className="gameroom-counter above counter counterFont"
          style={{
            height: "10px",
            color: "white",
            zIndex: "1000000000000 !important"
          }}
        >
          {this.state.counter}
        </div>

        <this.state.currRoom
          socket={this.state.socket}
          userImg={this.state.userImg}
          localUser={this.state.localUser}
          winner={this.state.winner}
          players={this.state.players}
          host={this.state.host}
          leftPlayers={this.state.leftPlayers}
          rightPlayers={this.state.rightPlayers}
        />
        <Grid container>
          <Grid item md={5} />

          <Grid item md={2}>
            {this.state.host === this.state.localUser &&
            this.state.currRoom === Lobby ? (
              <div align="center">
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.startGame()}
                >
                  START GAME
                </Button>
              </div>
            ) : null}
            {this.state.currRoom === Lobby ? null : (
              <div align="center">
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.lobbyReturn()}
                >
                  RETURN TO LOBBY
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
        <Verify history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    game: state.game,
    mySong: state.mySong,
    userProfile: state.userProfile,
    globalPlayers: state.globalPlayers
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      gameSwitch,
      songSwitch,
      updatePlayers
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameRoom);
