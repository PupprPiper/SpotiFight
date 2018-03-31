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
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  componentWillReceiveProps() {
    this.setState({
      isLoggedIn: !!localStorage.getItem('token')
    });
  }

  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
  }

  async logout() {
    try {
      await axios.get('/logout');
      this.props.storeCurrentUser(null);
      console.log(this.props);
      localStorage.clear();
      this.setState({ isLoggedIn: false });
      window.location.replace('/');
      console.log('local storage-->', localStorage);
    } catch (error) {
      console.log(error, 'here is your logout error');
    }
  }

  render() {
    let logoutBtn = (
      <Button
        onClick={() => this.logout()}
        className="navbar-item"
        color="inherit"
      >
        logout &nbsp;<ExitToApp />
      </Button>
    );

    return (
      <nav className="navbar is-dark" >
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
          <Typography
            className="navbar-item"
            color="inherit"
            variant="title"
            style={{ flex: 1 }}
          >
         
          </Typography>
          <span />
          <span />
          <span />
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
