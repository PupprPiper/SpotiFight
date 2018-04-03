import React, { Component } from 'react';
import { GridRow, OpponentGridRow } from './gridRow';

const FlappyGrid = ({ grid }) => {
  return <div>{grid.map((row, i) => <GridRow row={row} key={i} />)}</div>;
};

const OpponentGrid = ({ grid }) => {
  return (
    <div>{grid.map((row, i) => <OpponentGridRow row={row} key={i} />)}</div>
  );
};

module.exports = { FlappyGrid, OpponentGrid };
