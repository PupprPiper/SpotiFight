import React, {Component} from 'react';
import io from 'socket.io-client';
import Chat from '../Chat/Chat.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import players from '../Games/Masher/seed.js';
import Grid from 'material-ui/Grid';
import {gameSwitch, songSwitch} from '../../actions/index';
import Button from 'material-ui/Button';
import {assignLeftPlayer, assignRightPlayer} from './gameRoomHelpers';

import Lobby from '../Lobby/Lobby.jsx';
import Masher from '../Games/Masher/Masher.jsx';
import MusicTrivia from '../Games/MusicTrivia/MusicTrivia';
import Flappy from '../Games/Flappy/Flappy';
import RPSLS from '../Games/RPSLS/rpsls.jsx';
import Verify from '../Auth/Verify.jsx';

const games = {
  Lobby: Lobby,
  Masher: Masher,
  MusicTrivia: MusicTrivia,
  RPSLS: RPSLS,
  Flappy: Flappy
};
class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      test: '',
      currRoom: Lobby,
      players: [],
      socketID: '',
      localUser: this.props.userProfile.username,
      userImg: 'https://lh3.googleusercontent.com/-tcP7CBn3lpg/Tg15KKkK6pI/AAAAAAAAABQ/Hph0kqR-hKU/w530-h530-n-rw/photo.jpg',
      winner: '',
      globalSong: null,
      host: null,
      leftPlayers: [],
      rightPlayers: []
    };

    this.getWinner = this.getWinner.bind(this);
  }

  async componentWillMount() {
    try {
      // connect to server
      this.socket = await io.connect('http://localhost:8000', {
        query: {
          roomId: this.props.location.pathname.slice(11)
        }
      });

      await this.setState({socket: this.socket});
      // send user to lobby
      this.state.socket.emit('USER_ENTER_LOBBY', this.props.userProfile);
      // listen for other users in room
      this.socket.on('ACTIVE_USERS', data => {
        this.setState({players: data});

        if (this.state.players.length !== 0) {

          this.setState({host: this.state.players[0].username});
        }

        let left = assignLeftPlayer(this.state.players);
        let right = assignRightPlayer(this.state.players);

        this.setState({leftPlayers: left, rightPlayers: right});
      });

      this.socket.on('startGameAll', data => {
        this.setState({currRoom: games[data]});
      });

      this.state.socket.on('finalScoreObject', finalScore => {

        var winner = this.getWinner(finalScore);
        this.setState({winner: winner});
        this.state.socket.emit('broadcastWinner', winner);
        this.state.socket.emit('clearBoard', {});
        console.log(this.props.userProfile.username, 'this.props.userProfile.user')
        if (this.state.localUser === winner[0]) {
          this.state.socket.emit('SEND_WINNER_SONG', this.props.mySong);
        }
      });

      this.state.socket.on('GLOBAL_SONG', song => {
        this.setState({globalSong: song});
      });

    }
    catch (error) {
      console.error('in component did mount GAMEROOM')
    }

  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      // location is an object like window.location
      console.log('unlisten', action, location.pathname, location.state, this.props.history)
    })
  }
  componentWillUnmount() {
    this.state.socket.disconnect()
  }

  startGame() {
    this.socket.emit('startGameHost', this.props.game);
    this.setState({
      currRoom: games[this.props.game]
    });
  }
  lobbyReturn() {
    this.setState({currRoom: Lobby});
  }
  getWinner(final) {
    let values = Object.entries(final);
    values = values.sort((a, b) => {
      return b[1] - a[1];
    });
    return values[0];
  }

  render() {
    return (<div>
      {console.log('gameroom props', this.props)}
      <audio src={this.state.globalSong} autoPlay="autoPlay"/>
      <this.state.currRoom socket={this.state.socket} userImg={this.state.userImg} localUser={this.state.localUser} winner={this.state.winner} players={this.state.players} host={this.state.host} leftPlayers={this.state.leftPlayers} rightPlayers={this.state.rightPlayers}/>
      <Grid container>
        <Grid item md={5}/>

        <Grid item md={2}>
          {
            (this.state.host === this.state.localUser && this.state.currRoom === Lobby)
              ? (<div align="center">
                <Button variant="raised" color="secondary" onClick={() => this.startGame()}>
                  START GAME
                </Button>
              </div>)
              : null
          }
          {
            this.state.currRoom === Lobby
              ? null
              : (<div align="center">
                <Button variant="raised" color="secondary" onClick={() => this.lobbyReturn()}>
                  RETURN TO LOBBY
                </Button>
                <button onClick={() => console.log(this.props)}>test
                </button>
              </div>)
          }
        </Grid>
      </Grid>
      <Verify history={this.props.history}/>
    </div>);
  }
}

const mapStateToProps = function(state) {
  return {game: state.game, mySong: state.mySong, userProfile: state.userProfile};
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({
    gameSwitch,
    songSwitch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
