import React, { Component } from 'react';
// import { connect } from 'react-redux';
import GameListItem from './GameListItem';
import { games } from './homeHelpers';

class GameList extends Component {
  render() {
    return (
      <div>
        {games.map((game, i) => {
          return (
            <GameListItem
              key={i}
              game={game}
              history={this.props.history}
            />
          );
        })}
      </div>
    );
  }
}

export default GameList;
