import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
export default class Home extends Component {
  constructor(){
    super()
    this.state = {}
  }

  handleGameRoomRedirect(){

    this.props.history.push({pathname:'/game-room'})
  }
  render() {
    return <div>
      
      
      
      Hello from Home
      
      
      <input type ='submit' value = 'CREATE' onClick = {() => this.handleGameRoomRedirect()}/> 
      
      </div>;
  }
}
