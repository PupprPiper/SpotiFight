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

  componentDidMount() {
    this.setState({ isLoggedIn: !!localStorage.getItem('token') });
    console.log('props-->', this.props);
  }

  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
    console.log('from title bar -->', this.props);
  }

  async logout() {
    axios
      .get('/logout')
      .then(res => {
        this.props.storeCurrentUser(null);
        console.log(this.props);
      })
      .catch(err => console.error(err));
    localStorage.clear();
    this.setState({
      isLoggedIn: false
    });
    console.log('local storage-->', localStorage);
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
        <AppBar position="static">
          <Toolbar>
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
            {this.state.isLoggedIn ? logoutBtn : ''}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuIsOpen: state.menuIsOpen,
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ toggleMenu, storeCurrentUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTitleBar);