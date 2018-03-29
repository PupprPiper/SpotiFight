import React, { Component } from 'react';
import { OpponentGrid } from './grid';
import { opponentBanStyle, thumbnailStyle } from './gameHelpers';
import Ban from './ban.png';
import Bird from './bird.gif';

import './playerStatus.scss';

const PlayerStatusItem = ({ opponent }) => {
  return (
    <div>
      {opponent.crashed ? (
        <div style={opponentBanStyle}>{opponent.username} LOSES! </div>
      ) : (
        <div style={thumbnailStyle}>
          <img src={Bird} />
        </div>
      )}
    </div>
  );
};

export default PlayerStatusItem;
