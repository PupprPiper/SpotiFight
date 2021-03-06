import React, { Component } from 'react';
// import { connect } from 'react-redux';

import OpenRoomItems from './OpenRoomItems.jsx'
import {List} from '../Global/Material-Globals'

class OpenRoomsList extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div align = 'left'>
        {this.props.openrooms.map((room ,i) =>{
          return <OpenRoomItems index = {i} key = {i} room = {room} openrooms = {this.props.openrooms}  history={this.props.history} people = {this.props.people}/>
        })}
      </div>
    );
  }
}

export default OpenRoomsList;
