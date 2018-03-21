import React, { Component } from "react";
import io from "socket.io-client";
import Lobby from "../Lobby/Lobby.jsx";
import Chat from "../Chat/Chat.jsx";
import Masher from "../Games/Masher/Masher.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import players from "../Games/Masher/seed.js";
import Grid from "material-ui/Grid";
import { gameSwitch } from "../../actions/index";
import Button from "material-ui/Button";

const mapStateToProps = function(state) {
  return {
    game: state.game
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ gameSwitch }, dispatch);
};

const games = {
  'Masher': Masher
};
class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      test: "",
      currRoom: Lobby,
      players: players,
<<<<<<< HEAD
      socketID: "",
      localUser: "MikeUser",
      userImg:
        "https://lh3.googleusercontent.com/-tcP7CBn3lpg/Tg15KKkK6pI/AAAAAAAAABQ/Hph0kqR-hKU/w530-h530-n-rw/photo.jpg",
=======
      socketID: '',
      localUser: 'MikeUser',
      userImg: 'https://lh3.googleusercontent.com/-tcP7CBn3lpg/Tg15KKkK6pI/AAAAAAAAABQ/Hph0kqR-hKU/w530-h530-n-rw/photo.jpg',
      winner: '',
<<<<<<< HEAD
>>>>>>> GAME WORKS COMPLETELY
=======
>>>>>>> 20c7aa6fed94d4812ed078ea5b05e95b73ff3c1f

      selectedGame: this.props.game
    };
<<<<<<< HEAD
=======

    this.getWinner = this.getWinner.bind(this);


<<<<<<< HEAD


>>>>>>> GAME WORKS COMPLETELY
=======
    this.getWinner = this.getWinner.bind(this);




>>>>>>> 20c7aa6fed94d4812ed078ea5b05e95b73ff3c1f
  }
  async componentWillMount() {
    this.socket = await io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });
<<<<<<< HEAD
    await this.setState({ socket: this.socket });
    this.socket.on("startGameAll", data => {
      this.setState({ currRoom: games[data] });
    });
=======

  await this.setState({ socket: this.socket });

    this.socket.on('startGameAll', (data)=> {
      this.setState({currRoom: games[this.state.selectedGame]})
    })
>>>>>>> GAME WORKS COMPLETELY

    this.state.socket.on('finalScoreObject', (finalScore)=> {
      console.log(finalScore, 'HERE IS THE FINAL SCORE');
    var winner =  this.getWinner(finalScore);
    this.setState({winner: winner})
    this.state.socket.emit('broadcastWinner', winner);
  });

  }

  componentDidUpdate() {



    this.state.socket.on('finalScoreObject', (finalScore)=> {
      console.log(finalScore, 'HERE IS THE FINAL SCORE');
    var winner =  this.getWinner(finalScore);
    this.setState({winner: winner})
    this.state.socket.emit('broadcastWinner', winner);
  });

  }

  componentDidUpdate() {



  }

  startGame() {
    this.socket.emit("startGameHost", this.state.selectedGame);
    this.setState({ currRoom: games[this.state.selectedGame] });
  }

  getWinner(final) {
    console.log(final, 'in final score')
      let values = Object.entries(final);
    values = values.sort((a, b)=> {
        return b[1] - a[1];
      })
      console.log(values[0], '<------HERE IS YOUR WINNER')
      return values[0];
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        {console.log("gameroom", this.props)}
        <this.state.currRoom
          socket={this.state.socket}
          userImg={this.state.userImg}
          localUser={this.state.localUser}
=======
        <this.state.currRoom socket={this.state.socket}
        userImg={this.state.userImg}
        localUser={this.state.localUser}
        winner = {this.state.winner}
<<<<<<< HEAD
>>>>>>> GAME WORKS COMPLETELY
=======
>>>>>>> 20c7aa6fed94d4812ed078ea5b05e95b73ff3c1f
        />
        <Grid container>
          <Grid item md={5} />

          <Grid item md={2}>
            {this.state.selectedGame === null ? null : (
              <Button
                variant="raised"
                color="secondary"
                onClick={() => this.startGame()}
              >
                START GAME
              </Button>
            )}
            
          </Grid>
<<<<<<< HEAD
<<<<<<< HEAD
          <Grid item md={5} />
        </Grid>
=======
>>>>>>> GAME WORKS COMPLETELY
=======
>>>>>>> 20c7aa6fed94d4812ed078ea5b05e95b73ff3c1f
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
