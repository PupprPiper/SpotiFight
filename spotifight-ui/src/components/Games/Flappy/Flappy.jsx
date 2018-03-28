import React, { Component } from 'react';
import { Grid } from './grid';
import { Button } from './../../Global/Material-Globals';
import io from 'socket.io-client';
import './Flappy.scss';

import {
  bird,
  towers,
  createGrid,
  createTowers,
  moveTowers,
  checkCeilingAndFloor,
  banStyle
} from './gameHelpers';
import PlayerStatus from './playerStatus';

export default class Flappy extends Component {
  constructor(props) {
    super(props);

    let grid = [];
    for (let i = 0; i < 20; i++) {
      grid.push(new Array(30).fill('yellow'));
    }

    grid[bird.height][bird.position] = 'yellow';

    let socket = this.props.socket;

    this.state = {
      grid: grid,
      bird: bird,
      crashed: false,
      score: 0,
      towers,
      user: this.props.localUser,
      players: [],
      opponentGrids: {}
    };

    socket.on('TO_CLIENT_GRID', data => {
      this.state.opponentGrids[data.user] = data;
      this.setState({ opponentGrids: this.state.opponentGrids });
    });

    socket.on('CRASHED', data => {
      let playersCopy = this.state.players.map(player => {
        if (player.username === data.username) {
          player = data;
        }
        return player;
      });
      this.setState({ players: playersCopy });
    });

    this.timerId = setInterval(() => {
      if (this.state.crashed) {
        return;
      }
      // console.log('opponent grids', this.state.grid);

      let gridCopy = [];
      let towersCopy = this.state.towers.slice();
      let birdCopy = this.state.bird;
      let crashed = false;
      // towers
      createGrid(gridCopy, towersCopy);
      createTowers(gridCopy, towersCopy);
      moveTowers(towersCopy);

      birdCopy.height++;

      // game crashes
      if (birdCopy.height > 19 || birdCopy.height < 0) {
        birdCopy.height = 10;
        crashed = true;
      }

      for (let i = 0; i < 20; i++) {
        if (gridCopy[i][2] === 'blue' && birdCopy.height === i) {
          birdCopy.height = 10;
          crashed = true;
        }
      }

      if (crashed) {
        this.setState({ crashed: true });

        socket.emit('PLAYER_CRASHED', {
          username: this.props.localUser,
          crashed: true
        });
      }
      // birdy copy
      gridCopy[birdCopy.height][birdCopy.position] = 'yellow';

      this.setState({
        grid: gridCopy,
        bird: birdCopy,
        towers: towersCopy,
        score: this.state.score + 1
      });

      // socket.emit('TO_SERVER_GRID', this.state);
    }, 200);
  }

  componentDidMount() {
    let obj = {};
    let players = this.props.players.map(player => {
      return { username: player.username, crashed: false };
    });

    players.forEach(player => {
      obj[player.username] = {};
    });

    this.setState({
      players: players,
      opponentGrids: obj
    });
  }

  handleClick() {
    if (this.state.crashed) {
      return;
    }
    let birdCopy = this.state.bird;
    birdCopy.height -= 3;
    this.setState({ bird: birdCopy });
  }

  render() {

    let gameOver = (
      <div>
        Game Over! <h1>score: {this.state.score}</h1>
        <div style={banStyle} />
      </div>
    );

    let gameOn = (
      <div>
        <Grid grid={this.state.grid} style={banStyle} />
        {this.state.score}
        <PlayerStatus
          data={this.state.opponentGrids}
          players={this.state.players}
        />
      </div>
    );

    return (
      <div onClick={() => this.handleClick()}>
        {this.state.crashed ? gameOver : gameOn}
      </div>
    );
  }
}
