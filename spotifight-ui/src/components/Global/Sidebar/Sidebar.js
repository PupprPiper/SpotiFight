import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Drawer,
  AppBar,
  List,
  ListItem,
  IconButton,
  Typography,
  Toolbar,
  MenuIcon
} from './../Material-Globals';

import { toggleMenu } from './../../../actions/index';
import appRoutes from './../../../routes';
import TitleBar from './../TitleBar/titleBar';

class Navbar extends Component {
  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
  }

  render() {
    return (
      <div>
        <Drawer width={300} open={this.props.menuIsOpen}>
          <TitleBar
            handleCLick={() => this.handleToggle()}
            color="inherit"
            title="Spotifight"
            Icon={MenuIcon}
          />

          <List>
            {appRoutes.map((route, index) => {
              return (
                <NavLink
                  onClick={() => this.handleToggle()}
                  to={route.path}
                  key={index}
                  activeClassName="active"
                >
                  <ListItem>{route.sidebarName}</ListItem>
                </NavLink>
              );
            })}
          </List>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuIsOpen: state.menuIsOpen
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ toggleMenu }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
