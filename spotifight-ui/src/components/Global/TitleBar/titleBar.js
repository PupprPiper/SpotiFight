import React, { Component } from 'react';

import { AppBar, Toolbar, Typography, IconButton } from './../Material-Globals';

const TitleBar = ({ color, title, handleCLick, Icon }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={handleCLick} color={color} aria-label="Menu">
          <Icon />
        </IconButton>
        <Typography color={color} variant="title">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
