import React, { Component } from 'react';
import { GridCell, OpponentGridCell } from './gridCell';

const GridRow = ({ row }) => {
  const style = { display: 'flex' };
  return (
    <div style={style}>
      {row.map((cell, i) => {
        return <GridCell cell={cell} key={i} />;
      })}
    </div>
  );
};

const OpponentGridRow = ({ row }) => {
  const style = { display: 'flex' };
  return (
    <div style={style}>
      {row.map((cell, i) => {
        return <OpponentGridCell cell={cell} key={i} />;
      })}
    </div>
  );
};

module.exports = { GridRow, OpponentGridRow };
