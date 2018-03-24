import React, { Component } from 'react';
import GridRow from './gridRow';

const Grid = props => {
  return <div>{props.grid.map((row, i) => <GridRow row={row} key={i} />)}</div>;
};

export default Grid;
