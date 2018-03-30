import React, { Component, PropTypes } from 'react';
import randomstring from 'randomstring';
import {ListItem, Avatar, ListItemText, Paper} from '../Global/Material-Globals'
import {withStyles} from 'material-ui/styles'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gameSwitch, songSwitch } from '../../actions/index';
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
      state: { game: this.props.gameitem.title }
    });
    this.props.gameSwitch(this.props.gameitem.title)
  }

  render() {
    return (
        
          <ListItem > 
          
            <Avatar onClick={() => this.handleRedirect(this.props.gameitem.title)} src={this.props.gameitem.image} className = {this.props.classes.LobbyItems}/>
            <ListItemText primary = {`${this.props.gameitem.title}`} />
            
          </ListItem>
         
       
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
export default connect(mapStateToProps, mapDispatchToProps)(styledGameListItem)

