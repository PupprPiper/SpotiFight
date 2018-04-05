import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import "./PlayerButton.scss";
import Subheader from 'material-ui/List/ListSubheader';

import $ from 'jquery';

class PlayerButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      score: this.props.player.score,
      scoreDisplay: 0,
      player: this.props.player.userName,
      socket: this.props.socket
    }

    this.clearGameBoard = this.clearGameBoard.bind(this);
    this.buildGameBoard = this.buildGameBoard.bind(this);
    this.updateScore = this.updateScore.bind(this);

    this.props.socket.on('displayUpdate', data => {
      if (this.state.player = data.player) {
        this.setState({
          scoreDisplay: data.score[this.props.player.username]
        });

      }
    });

  }

  clearGameBoard() {
    this.props.socket.emit('clearBoard', {})
  }

  buildGameBoard() {
    this.props.socket.emit('buildBoard', {
      localUser: this.props.player.userName,
      score: this.state.score
    });
  }

  componentWillMount() {
    this.clearGameBoard();
  }

  componentDidMount() {
    this.buildGameBoard();
  }

  updateScore(num) {
    this.props.socket.emit('updateScore', {
      localUser: this.props.player.username,
      plusMinus: num
    });
  }

  buttonHandler(e) {
    if (e.keyCode == 77) {
      console.log('firing')
      this.updateScore(1);
    }
  }




  render(props) {
    return (<div autoFocus onKeyUp={(e) => this.buttonHandler(e)}>
      <button autoFocus className="btn draw-border" onClick={() => this.updateScore(1)}>{this.state.scoreDisplay}</button>
      <Subheader style={{
          'fontSize' : '2.5em'
        }}>{this.props.player.username}</Subheader>
      <button className="btn draw-border-down" onClick={() => this.updateScore(-1)}>{String.fromCharCode(0x25BC)}</button>
    </div>);
  }
}

export default PlayerButton;
