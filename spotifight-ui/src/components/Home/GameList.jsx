import React, { Component } from 'react';
// import { connect } from 'react-redux';
import GameListItem from './GameListItem.jsx';
import { games } from './homeHelpers';
import {List} from '../Global/Material-Globals'
import Carousel from 'nuka-carousel'

const style = {
  LobbyItems:{
    cursor: 'Pointer',
    height: 500,
    width: 500,
    color: 'white',
    align: 'center'
  },
  LobbyText:{
    fontSize: 40,
    color: 'white'
  }
};
class GameList extends Component {
  render() {
    return (

        <Carousel renderBottomCenterControls={false} cellAlign={'center'} slidesToShow={3}  cellSpacing={100} >
        {games.map((item, i) => {
          return (
            <GameListItem
              key={i}
              gameitem={item}
              history={this.props.history}
              style = {style}

            />
          );
        })}
        </Carousel>

    );
  }
}

export default GameList;
