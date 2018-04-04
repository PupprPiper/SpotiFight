import React, { Component } from 'react';
import { connect } from 'react-redux';

const GridCell = ({ cell }) => {
  const style = {
    width: 20,
    height: 20,
    // background: `url("https://files.gamebanana.com/img/ico/sprays/_1317-.gif") no-repeat center center`,
    backgroundColor: cell
  };
  return <div style={style} />;
};

const OpponentGridCell = ({ cell }) => {
  const style = {
    width: 5,
    height: 5,
    // border: '1px solid black',
    backgroundColor: cell
  };
  return <div style={style} />;
};

module.exports = { GridCell, OpponentGridCell };
