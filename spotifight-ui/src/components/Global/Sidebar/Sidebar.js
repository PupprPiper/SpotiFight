import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { RaisedButton, Drawer, AppBar, MenuItem } from './../Material-Globals';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from './../../../actions/index';

class Navbar extends Component {
  constructor() {
    super();
  }

  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
  }

  render() {
    return (
      <div>
        <Drawer width={300} openSecondary={false} open={this.props.menuIsOpen}>
          <AppBar
            onLeftIconButtonClick={() => this.handleToggle()}
            title="Spotifight"
          />
          <MenuItem>
            <NavLink to="/">Home</NavLink>
          </MenuItem>
          <MenuItem>Lobby</MenuItem>
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
