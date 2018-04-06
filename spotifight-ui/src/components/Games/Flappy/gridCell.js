import React, { Component } from 'react';
import Bird from './bird2.gif';
import Asteroid from './asteroid.png';
import Brick from './bricks.jpg';

const GridCell = ({ cell }) => {
  let style;
  if (cell === 'yellow') {
    style = {
      width: 20,
      height: 20,
      overflow: 'visible !important'
    };

    return (
      <div style={style}>
        <img src={Bird} />
      </div>
    );
  } else if (cell === 'red') {
    style = {
      width: 20,
      height: 20,
      background: `url(${Asteroid}) no-repeat center center`,
      backgroundSize: 'contain'
    };
  } else if (cell === 'blue') {
    style = {
      width: 20,
      height: 20,
      background: `url(${Brick}) no-repeat center center`,
      backgroundSize: 'contain'
    };
  } else {
    style = {
      width: 20,
      height: 20,
      backgroundColor: cell
    };
  }

  return <div style={style} />;
};

// const mapStateToProps = state => {
//   return {
//     userProfile: state.userProfile
//   };
// };

module.exports = { GridCell };
