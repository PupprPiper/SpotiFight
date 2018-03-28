import React, { Component } from 'react';
import { OpponentGrid } from './grid';
import { opponentBanStyle, opponentThumbnailStyle } from './gameHelpers';
import Ban from './ban.png';
import Bird from './bird.gif';

import './playerStatus.scss';

const PlayerStatus = ({ data, players }) => {
  let usernames = Object.keys(data);
  return (
    <div>
      {usernames.map((username, i, arr) => {
        let grid = data[username];
        if (data[username] && data[username].grid) {
          if (players[i].crashed) {
            return (
              <div key={i} style={opponentThumbnailStyle(Ban)}>
                {username} LOSES!
              </div>
            );
          }
          return (
            <div key={i}>
              <img src={Bird} />
              {username}
            </div>
          );
        }
      })}
    </div>
  );
};

export default PlayerStatus;
