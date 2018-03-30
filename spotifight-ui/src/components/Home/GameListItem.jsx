import React, { Component, PropTypes } from 'react';
import randomstring from 'randomstring';
import {ListItem, Avatar, ListItemText, Paper} from '../Global/Material-Globals'
import {withStyles} from 'material-ui/styles'
// import { connect } from 'react-redux';
const style = {
  LobbyItems:{
    cursor: 'Pointer',
    height: 100,
    width: 100
  }
};
class GameListItem extends Component {
  handleRedirect() {
    this.props.history.push({
      pathname: `/game-room/${randomstring.generate()}`,
      state: { game: this.props.game.title }
    });
  }

  render() {
    return (
        
          <ListItem > 
          
            <Avatar onClick={() => this.handleRedirect(this.props.game.title)} src={this.props.game.image} className = {this.props.classes.LobbyItems}/>
            <ListItemText primary = {`${this.props.game.title}`} />
            
          </ListItem>
         
       
    );
  }
}

export default withStyles(style)(GameListItem);
