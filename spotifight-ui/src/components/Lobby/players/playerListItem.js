import React, { Component } from 'react';
import {
  List,
  Paper,
  ListItem,
  Avatar,
  ListItemText
} from './../../Global/Material-Globals';

const PlayerListItem = ({ player, songChoices }) => {
  return (
    <Paper>
      <ListItem dense button className="list-item">
        <Avatar src={player.avatar_url} />
        <ListItemText
          primary={`${player.username}`}
          secondary={`Song: ${
            songChoices.hasOwnProperty([player.username])
              ? songChoices[player.username]
              : ''
          }`}
        />
      </ListItem>
    </Paper>
  );
};

export default PlayerListItem;