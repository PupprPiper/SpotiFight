import React, {Component} from 'react'
import Paper from "@material-ui/core/Paper";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Avatar,
  Checkbox,
  Button
} from "./../Global/Material-Globals";

const mapStateToProps = function(state) {
  return {
    mySong: state.mySong,
    userProfile: state.userProfile,
    game: state.game,
    songSelections: state.songSelections,
    globalPlayers: state.globalPlayers
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    { gameSwitch, songSwitch, updateSongSelections, updatePlayers },
    dispatch
  );
};

class PlayersLeft extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }


render(){
  <div> 
  {this.props.players
  .filter((item, index) => {
    if (index % 2 === 0) {
      return item;
    }
  })
  .map((filtered, index) => {
    return (
      <Paper key={index}>
        <ListItem dense button className="list-item">
          <Avatar src={filtered.avatar_url} />
          <ListItemText
            primary={`${filtered.username}`}
            secondary={`Song: ${
              this.state.songChoices.hasOwnProperty([
                filtered.username
              ])
                ? this.state.songChoices[filtered.username]
                : ""
            }`}
          />
        </ListItem>
      </Paper>
    );
  })
}}
</div>

}}