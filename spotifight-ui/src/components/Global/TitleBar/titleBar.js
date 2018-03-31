import React from 'react';

import { AppBar, Toolbar, Typography, IconButton } from './../Material-Globals';

const TitleBar = ({ color, title, handleCLick, Icon }) => {
  return (
    <nav className="navbar is-dark">
      <div className="navbar-brand">
        <a className="navbar-item">
          <IconButton
            onClick={handleCLick}
            title="Spotifight"
            color="inherit"
            aria-label="Menu"
          >
            <Icon />
          </IconButton>
        </a>
        <div className="navbar-item">
          <Typography color="inherit" variant="title" style={{ flex: 1 }}>
            Spotifight
          </Typography>
        </div>
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
};

export default TitleBar;
