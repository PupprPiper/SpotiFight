import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from './../../../actions/index';
import List from 'material-ui-icons';

import {
  AppBar,
  Toolbar,
  Typography,
  MenuIcon,
  Button,
  IconButton
} from './../Material-Globals';

const TitleBar = ({ color, onClick, title, Icon }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={onClick} color={color} aria-label="Menu">
          <Icon />
        </IconButton>
        <Typography variant="title" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
