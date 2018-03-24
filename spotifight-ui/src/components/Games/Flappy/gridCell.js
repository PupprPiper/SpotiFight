import React, { Component } from 'react';

const GridCell = (props) => {
  const style = {
    width: 20,
    height: 20,
    // border: '1px solid black',
    backgroundColor: props.cell
  };
  return <div style={style} />;
};

export default GridCell;
