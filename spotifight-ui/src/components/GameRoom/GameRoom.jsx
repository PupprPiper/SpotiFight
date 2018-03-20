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
      socketID: "",
      localUser: "MikeUser",
      userImg:
        "https://lh3.googleusercontent.com/-tcP7CBn3lpg/Tg15KKkK6pI/AAAAAAAAABQ/Hph0kqR-hKU/w530-h530-n-rw/photo.jpg",

      selectedGame: this.props.game
    };
  }
  async componentWillMount() {
    this.socket = await io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });
    await this.setState({ socket: this.socket });
    this.socket.on("startGameAll", data => {
      this.setState({ currRoom: games[data] });
    });

  }

  startGame() {
    this.socket.emit("startGameHost", this.state.selectedGame);
    this.setState({ currRoom: games[this.state.selectedGame] });
  }

  render() {
    return (
      <div>
        {console.log("gameroom", this.props)}
        <this.state.currRoom
          socket={this.state.socket}
          userImg={this.state.userImg}
          localUser={this.state.localUser}
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
          <Grid item md={5} />
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
