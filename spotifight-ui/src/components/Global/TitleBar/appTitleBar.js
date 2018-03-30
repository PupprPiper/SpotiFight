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
      <div>
        <Button onClick={() => this.logout()} color="inherit">
          logout &nbsp;<ExitToApp />
        </Button>
      </div>
    );

    return (
      <div>
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
              <Typography color="inherit" variant="title" style={{ flex: 1 }}>
                Spotifight
              </Typography>
            </a>
            <a
              className="navbar-item is-hidden-desktop"
              href="https://github.com/jgthms/bulma"
              target="_blank"
            >
              <span className="icon" style={{ color: '#333' }}>
                <i className="fa fa-github" />
              </span>
            </a>
            <a
              className="navbar-item is-hidden-desktop"
              href="https://twitter.com/jgthms"
              target="_blank"
            >
              <span className="icon" style={{ color: '#55acee' }}>
                <i className="fa fa-twitter" />
              </span>
            </a>

            {this.props.userProfile ? logoutBtn: null}
            {/* <div className="navbar-burger burger" data-target="navMenuExample3"> */}
              <span />
              <span />
              <span />
            {/* </div> */}
          </div>
        </nav>
      </div>
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
