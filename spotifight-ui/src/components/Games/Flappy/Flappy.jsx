import React, { Component } from 'react';
import { FlappyGrid } from './grid';
import { Grid } from './../../Global/Material-Globals';
import { Button } from './../../Global/Material-Globals';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import './Flappy.scss';

import {
  asteroids,
  banStyle,
  bird,
  checkCeilingAndFloor,
  createGrid,
  createTowers,
  createAsteroids,
  moveTowers,
  moveAsteroids,
  towers,
  winnerStyle
} from './gameHelpers';
import PlayerStatus from './playerStatus';

class Flappy extends Component {
  constructor(props) {
    super(props);

    let grid = [];
    for (let i = 0; i < 20; i++) {
      grid.push(new Array(30).fill('yellow'));
    }

    grid[bird.height][bird.position] = 'yellow';

    this.state = {
      grid,
      bird,
      towers,
      asteroids,
      crashed: false,
      score: 0,
      user: this.props.localUser,
      socket: this.props.socket,
      opponents: {},
      temp: {},
      winner: null
    };

    this.timerId = setInterval(() => {
      if (this.state.crashed) {
        return;
      }

      let gridCopy = [];
      let towersCopy = this.state.towers.slice();
      let asteroidsCopy = this.state.asteroids.slice();
      let birdCopy = this.state.bird;
      let crashed = false;
      // towers
      createGrid(gridCopy, towersCopy);
      createTowers(gridCopy, towersCopy);
      moveTowers(towersCopy);
      createAsteroids(gridCopy, asteroidsCopy);
      moveAsteroids(asteroidsCopy);

      birdCopy.height++;

      // game crashes
      if (birdCopy.height > 19 || birdCopy.height < 0) {
        birdCopy.height = 10;
        crashed = true;
      }

      for (let i = 0; i < 20; i++) {
        if (
          (gridCopy[i][2] === 'blue' && birdCopy.height === i) ||
          (gridCopy[i][2] === 'red' && birdCopy.height === i)
        ) {
          birdCopy.height = 10;
          crashed = true;
        }
      }

      if (crashed) {
        this.setState({ crashed: true });

        this.props.socket.emit('PLAYER_CRASHED', {
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
    }, 150);
  }

  componentDidMount() {
    this.props.socket.on('WINNER_SERVER', data => {
      this.setState({ winner: data.winner });
      if (this.props.localUser === data.winner) {
        this.props.socket.emit('SEND_WINNER_SONG', this.props.mySong);
      }
    });

    this.props.socket.on('CRASHED', data => {
      const temp = this.state.temp;
      this.state.opponents[data.username] = data;
      delete temp[data.username];

      if (Object.keys(temp).length === 1) {
        console.log('we have a winner!!!!', Object.keys(temp)[0]);
        this.props.socket.emit('WINNER_CLIENT', Object.keys(temp)[0]);
      }

      this.setState({ opponents: this.state.opponents, temp: this.state.temp });
    });
    let obj = {};

    this.props.players.forEach(player => {
      obj[player.username] = { username: player.username, crashed: false };
    });
    this.setState({
      opponents: Object.assign({}, obj),
      temp: Object.assign({}, obj)
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
    const { winner } = this.state;
    if (winner) {
      return <div style={winnerStyle}>{winner} IS THE WINNER!</div>;
    }

    return (
      <Grid container>
        <Grid item sm={12} md={3} align="center">
          <div>
            <PlayerStatus opponents={this.state.opponents} />
          </div>
        </Grid>
        <Grid item sm={12} md={6} align="center">
          {this.state.crashed ? (
            <div style={{ fontSize: '6em' }}>
              Game Over! <h1>score: {this.state.score}</h1>
              <div style={banStyle} />
            </div>
          ) : (
            <div onClick={() => this.handleClick()}>
              <h2 style={{ fontSize: '6em' }}>{this.state.score}</h2>
              <FlappyGrid grid={this.state.grid} />
            </div>
          )}
        </Grid>
        <Grid item sm={12} md={3} />
      </Grid>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    mySong: state.mySong
  };
};

export default connect(mapStateToProps)(Flappy);
