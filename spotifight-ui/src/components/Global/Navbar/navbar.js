import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from './../../../actions/index';

import { AppBar } from './../Material-Globals';
import Sidebar from './../Sidebar/Sidebar';

class Navbar extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <AppBar style={{ margin: 0 }}
          title="Spotifight"
          onLeftIconButtonClick={() => this.handleToggle()}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
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
