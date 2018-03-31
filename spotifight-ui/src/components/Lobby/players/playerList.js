import React, { Component } from 'react';
import { List } from './../../Global/Material-Globals';

import PlayerListItem from './playerListItem';

const PlayerList = ({ leftPlayers, songChoices }) => {
  return (
    <List>
      {leftPlayers.map((player, i) => {
        return (
          <PlayerListItem key={i} player={player} songChoices={songChoices} />
        );
      })}
    </List>
  );
};

export default PlayerList;
