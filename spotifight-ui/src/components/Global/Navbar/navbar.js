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

class Navbar extends Component {
  constructor() {
    super();
  }

  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => this.handleToggle()} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Spotifight
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    menuIsOpen: state.menuIsOpen
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ toggleMenu }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
{
  /* <AppBar
        title="Spotifight"
        onLeftIconButtonClick={() => this.handleToggle()}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      /> */
}
