import React, {Component} from 'react';
import ButtonGrid from './ButtonGrid.jsx';
import players from './seed.js';
import Subheader from 'material-ui/List/ListSubheader';
import './Masher.scss';


import {
  TextField,
  Drawer,
  AppBar,
  Button,
  List,
  ListItem,
  Toolbar,
  Typography,
  IconButton,
  MenuIcon,
  Grid
} from '../../Global/Material-Globals.js';

export default class Masher extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userName: "A Dude",
      players: players,
      counter: 10
    }



  }



  countdown() {
    if (this.state.counter > 0) {
      this.setState({
        counter: this.state.counter -= 1
      })
    }
    if (this.state.counter===0) {
      alert('game over!')
      this.setState({
        counter: this.state.counter -= 1
      })
    }
  }

  componentDidMount() {
    var id = setInterval(()=> this.countdown(), 1000);
    if (this.counter === 0) {
      clearInterval(id);
    }

  }

  render(props) {
    {
      console.log(this.state.players),
      'I AM IN MASHER'
    }
    return <div>
    <div align="center" className="flipInY masher-counter">{this.state.counter}</div>
      <ButtonGrid players={this.state.players}/>
    </div>;
  }
}
