import React, { Component } from 'react';
import { RaisedButton } from './../Material-Globals';

export const Button = ({ label, onClick, style }) => {
  return <RaisedButton label={label} onClick={onClick} style={style} />;
};
