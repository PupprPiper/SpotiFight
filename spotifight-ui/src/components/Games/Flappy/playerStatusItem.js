import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OpponentGrid } from './grid';
import { opponentBanStyle, thumbnailStyle } from './gameHelpers';
import Ban from './ban.png';
import Bird from './bird2.gif';

import './playerStatus.scss';

const PlayerStatusItem = ({ opponent }) => {
  return (
    <div style={{ display: 'table' }}>
      {opponent.crashed ? (
        <div style={opponentBanStyle}>{opponent.username} LOSES! </div>
      ) : (
        <div style={thumbnailStyle}>
          <img src={Bird} /> {opponent.username}
        </div>
      )}
    </div>
  );
};

export default PlayerStatusItem;
