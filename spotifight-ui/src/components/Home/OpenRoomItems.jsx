import React, { Component, PropTypes } from "react";
import randomstring from "randomstring";
import { ListItem, Avatar, ListItemText, Paper } from "../Global/Material-Globals";
import { withStyles } from "material-ui/styles";
// import { connect } from 'react-redux';
const style = {
  LobbyItems:{
    cursor: 'Pointer'
  }
};
class OpenRoomItems extends Component {
  constructor(props) {
    super(props);
  }
  handleRedirect() {
    this.props.history.push({
      pathname: `/game-room/${randomstring.generate()}`,
      state: { game: this.props.game.title }
    });
  }
  handleRoomClick() {
    this.props.history.push({
      pathname: `game-room/${this.props.room}`
    });
  }

  render() {
    return (
     
      <ListItem onClick={() => this.handleRoomClick()} className = {this.props.classes.LobbyItems}>
        <ListItemText
          primary={`ROOM ${this.props.index + 1}`}
          secondary={`There is ${
            this.props.openrooms.length
          } player(s) in this room`}
        />
      </ListItem>
      
    );
  }
}

export default withStyles(style)(OpenRoomItems);
