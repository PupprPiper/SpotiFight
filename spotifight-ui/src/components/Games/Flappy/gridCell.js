import React, { Component } from 'react';


const GridCell = ({ cell }) => {
  // if (cell === 'yellow') {
  //   console.log('user profile--->');
  // }

  const style = {
    width: 20,
    height: 20,
    // background: `url("https://files.gamebanana.com/img/ico/sprays/_1317-.gif") no-repeat center center`,
    backgroundColor: cell
  };
  return <div style={style} />;
};

// const mapStateToProps = state => {
//   return {
//     userProfile: state.userProfile
//   };
// };

module.exports = { GridCell };
