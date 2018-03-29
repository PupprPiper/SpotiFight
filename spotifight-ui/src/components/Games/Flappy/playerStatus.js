import React, { Component } from 'react';
import PlayerStatusItem from './playerStatusItem';

import './playerStatus.scss';

const PlayerStatus = ({ opponents }) => {
  let usernames = Object.keys(opponents);

  return (
    <div>
      {usernames.map((username, i) => {
        console.log(opponents[username])
        return <PlayerStatusItem opponent={opponents[username]} key={i} />;
      })}
    </div>
  );
};

export default PlayerStatus;
