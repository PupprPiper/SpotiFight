import React, { Component, PropTypes } from 'react';
import randomstring from 'randomstring';

import {
  ListItem,
  Avatar,
  ListItemText,
  Paper
} from '../Global/Material-Globals';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gameSwitch, songSwitch } from '../../actions/index';

// import { connect } from 'react-redux';

const style = {
  LobbyItems:{
    cursor: 'Pointer',
    height: '100%',
    width: '100%',
    color: 'white',
    align: 'center',
    minWidth:'150px',
    minHeight:'150px',


  },
  LobbyText:{
    fontSize: 'calc(12px + 2vw)',
    color: 'white'
  }
};
class GameListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameitemimage: this.props.gameitem.image
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleRedirect() {
    this.props.history.push({
      pathname: `/game-room/${randomstring.generate()}`,
      state: { game: this.props.gameitem.title }
    });
    this.props.gameSwitch(this.props.gameitem.title);
  }

  handleMouseOver() {
    this.setState({ gameitemimage: this.props.gameitem.hover });
  }
  handleMouseOut() {
    this.setState({ gameitemimage: this.props.gameitem.image });
  }

  render() {
    return (

      <div style = {{padding: '50px'}}>
        <Avatar
          onClick={() => this.handleRedirect(this.props.gameitem.title)}
          src={this.state.gameitemimage}
          className={this.props.classes.LobbyItems}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div className={this.props.classes.LobbyText}>
          {`${this.props.gameitem.title}`}{' '}

        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    game: state.game,
    mySong: state.mySong,
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ gameSwitch, songSwitch }, dispatch);
};

const styledGameListItem = withStyles(style)(GameListItem);
export default connect(mapStateToProps, mapDispatchToProps)(styledGameListItem);
