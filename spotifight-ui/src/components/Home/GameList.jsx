import React, { Component } from 'react';
// import { connect } from 'react-redux';
import GameListItem from './GameListItem.jsx';
import { games } from './homeHelpers';
import {List} from '../Global/Material-Globals'

class GameList extends Component {
  render() {
    return (
      <div>
        <List> 
        {games.map((game, i) => {
          return (
            <GameListItem
              key={i}
              game={game}
              history={this.props.history}
            />
          );
        })}
        </List>
      </div>
    );
  }
}

export default GameList;
