import React, { Component } from 'react';
import GridCell from './gridCell';

const GridRow = props => {
  const style = { display: 'flex' };
  return (
    <div style={style}>
      {props.row.map((cell, i) => {
        return <GridCell cell={cell} key={i} />;
      })}
    </div>
  );
};

export default GridRow;
