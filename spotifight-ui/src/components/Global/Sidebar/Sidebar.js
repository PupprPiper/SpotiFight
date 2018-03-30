import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuIcon,
  InboxIcon,
  Typography,
  Toolbar
} from './../Material-Globals';
import axios from 'axios';

import { toggleMenu } from './../../../actions/index';
import appRoutes from './../../../routes';
import TitleBar from './../TitleBar/titleBar';
import './Sidebar.scss';

class Navbar extends Component {
  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
  }

  verifyUser() {
    axios.post('/friends');
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
              if (route.protected && !localStorage.getItem('token')) {
                return;
              }
              return (
                <NavLink
                  onClick={() => this.handleToggle()}
                  to={route.path}
                  key={index}
                  activeClassName="active"
                >
                  <ListItem button>
                    {route.icon ? (
                      <ListItemIcon>
                        <route.icon />
                      </ListItemIcon>
                    ) : (
                      ''
                    )}
                    <ListItemText primary={route.sidebarName} />
                  </ListItem>
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
