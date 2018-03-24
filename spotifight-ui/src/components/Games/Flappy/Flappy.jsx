import React, { Component } from 'react';
import Grid from './grid';
import { Button } from './../../Global/Material-Globals';
import io from 'socket.io-client';

export default class Flappy extends Component {
  constructor(props) {
    super(props);
    let grid = [];
    for (let i = 0; i < 20; i++) {
      grid.push(new Array(30).fill('red'));
    }
    let bird = {
      height: 10,
      position: 2
    };
    let towers = [
      { position: 29, height: 5, upright: false },
      { position: 26, height: 8, upright: true },
      { position: 22, height: 7, upright: false },
      { position: 18, height: 6, upright: true },
      { position: 14, height: 7, upright: false },
      { position: 11, height: 3, upright: true },
      { position: 7, height: 8, upright: false },
      { position: 3, height: 2, upright: true }
    ];
    grid[bird.height][bird.position] = 'yellow';

    this.state = {
      grid: grid,
      bird: bird,
      crashed: false,
      score: 0,
      towers
    };
    this.timerId = setInterval(() => {
      if (this.state.crashed) {
        return;
      }

      let gridCopy = [];
      let towersCopy = this.state.towers.slice();
      for (let i = 0; i < 20; i++) {
        gridCopy.push(new Array(30).fill('red'));
      }

      for (let i = 0; i < towersCopy.length; i++) {
        for (let j = 0; j < towersCopy[i].height; j++) {
          if (towersCopy[i].upright) {
            gridCopy[19 - j][towersCopy[i].position] = 'blue';
          } else {
            gridCopy[j][towersCopy[i].position] = 'blue';
          }
        }
      }
      let birdCopy = this.state.bird;

      for (let i = 0; i < towersCopy.length; i++) {
        towersCopy[i].position--;
        if (towersCopy[i].position < 0) {
          towersCopy[i].position = 29;
          towersCopy[i].height = Math.floor(Math.random() * 7) + 3;
        }
      }

      birdCopy.height++;
      let crashed = false;
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

      crashed ? this.setState({ crashed: true }) : '';

      gridCopy[birdCopy.height][birdCopy.position] = 'yellow';

      this.setState({
        grid: gridCopy,
        bird: birdCopy,
        towers: towersCopy,
        score: this.state.score + 1
      });

      console.log(this.state);
    }, 150);
  }

  handleClick() {
    if (this.state.crashed) {
      return;
    }
    let birdCopy = this.state.bird;
    birdCopy.height -= 3;
    this.setState({
      bird: birdCopy
    });
  }

  restart() {
    this.setState({ crashed: false, score: 0 });
  }

  render() {
    let gameOver = (
      <div>
        Game Over!
        <Button onClick={() => this.restart()} color="primary">
          restart
        </Button>
      </div>
    );
    return (
      <div onClick={() => this.handleClick()}>
        {this.state.crashed ? gameOver : this.state.score}
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}
