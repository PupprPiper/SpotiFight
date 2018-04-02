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

    this.state = {
      grid: grid,
      bird: bird,
      crashed: false,
      score: 0,
      towers,
      user: this.props.localUser,
      opponents: {},
      socket: this.props.socket
    };

    let obj = {};
    // console.log('players--->',this.props.players)
    this.props.players.forEach(player => {
      obj[player.username] = { username: player.username, crashed: false };
    });
    
    this.setState({ opponents: obj });

    this.props.socket.on('CRASHED', data => {
      this.state.opponents[data.username] = data;
      this.setState({ opponents: this.state.opponents });
    });

    this.timerId = setInterval(() => {
      if (this.state.crashed) {
        return;
      }

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
    }, 200);
  }

  componentWillMount() {}

  handleClick() {
    if (this.state.crashed) {
      return;
    }
    let birdCopy = this.state.bird;
    birdCopy.height -= 3;
    this.setState({ bird: birdCopy });
  }

  render() {
    // let gameOver = (
    //   <div>
    //     Game Over! <h1>score: {this.state.score}</h1>
    //     <div style={banStyle} />
    //   </div>
    // );

    // let gameOn = (
    //   <div onClick={() => this.handleClick()}>
    //     <Grid grid={this.state.grid} />
    //     {this.state.score}
    //   </div>
    // );

    return (
      <div>
        {this.state.crashed ? (
          <div>
            Game Over! <h1>score: {this.state.score}</h1>
            <div style={banStyle} />
          </div>
        ) : (
          <div onClick={() => this.handleClick()}>
            <Grid grid={this.state.grid} />
            {this.state.score}
          </div>
        )}
        <PlayerStatus opponents={this.state.opponents} />
      </div>
    );
  }
}
