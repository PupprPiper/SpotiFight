import React, { Component, PropTypes } from 'react';
import randomstring from 'randomstring';
// import { connect } from 'react-redux';

class GameListItem extends Component {
  handleRedirect() {
    this.props.history.push({
      pathname: `/game-room/${randomstring.generate()}`,
      state: { game: this.props.game.title }
    });
  }

  render() {
    return (
        <div>
          <img
            onClick={() => this.handleRedirect(this.props.game.title)}
            src={this.props.game.image}
          />
        </div>
    );
  }
}

export default GameListItem;
