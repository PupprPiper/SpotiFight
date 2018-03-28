import React, { Component } from 'react';

const GridCell = ({ cell }) => {
  const style = {
    width: 20,
    height: 20,
    // border: '1px solid black',
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
