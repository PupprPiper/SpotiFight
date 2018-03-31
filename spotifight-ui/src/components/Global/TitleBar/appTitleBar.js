import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
  ExitToApp
} from './../Material-Globals.js';
import axios from 'axios';

import { toggleMenu, storeCurrentUser } from './../../../actions/index';

class AppTitleBar extends Component {
  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
  }

  async logout() {
    try {
      await axios.get('/logout');
      this.props.storeCurrentUser(null);
      localStorage.clear();
      window.location.replace('/login');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let logoutBtn = (
      <Button onClick={() => this.logout()} color="inherit">
        logout &nbsp;<ExitToApp />
      </Button>
    );

    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <a className="navbar-item">
            <IconButton
              onClick={() => this.handleToggle()}
              title="Spotifight"
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
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
        <div className="navbar-end">
          {this.props.userProfile ? logoutBtn : null}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { menuIsOpen: state.menuIsOpen, userProfile: state.userProfile };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      toggleMenu,
      storeCurrentUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTitleBar);
