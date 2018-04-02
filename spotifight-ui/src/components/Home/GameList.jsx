import React, { Component } from 'react';
// import { connect } from 'react-redux';
import GameListItem from './GameListItem.jsx';
import { games } from './homeHelpers';
import {List} from '../Global/Material-Globals'
import Carousel from 'nuka-carousel'


class GameList extends Component {
  render() {
    return (
      
        <Carousel renderBottomCenterControls={false} cellAlign = 'center' slidesToShow={3} > 
        {games.map((item, i) => {
          return (
            <GameListItem
              key={i}
              gameitem={item}
              history={this.props.history}
            />
          );
        })}
        </Carousel>

    );
  }
}

export default GameList;
