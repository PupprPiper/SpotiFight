import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import randomstring from 'randomstring'


let randomRoom;
export default class Home extends Component {
  constructor(){
    super()
    this.state = {}
  }

  randomRoom(){
    randomRoom = `${randomstring.generate()}`
  }
  handleGameRoomRedirect(){
    this.randomRoom()
    this.props.history.push({pathname:`/game-room/${randomRoom}`})
  }
  render() {
    return <div>
      
      {console.log(this.props)}
      
      Hello from Home
      
      
      <input type ='submit' value = 'CREATE' onClick = {() => this.handleGameRoomRedirect()}/> 
      
      </div>;
  }
}
