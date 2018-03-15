import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from './../../../actions/index';

import { AppBar } from './../Material-Globals';

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
<<<<<<< HEAD
      <AppBar
        title="Spotifight"
        onLeftIconButtonClick={() => this.handleToggle()}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
=======
      <div>
        <Sidebar />
        <AppBar style={{ margin: 0 }}
          title="Spotifight"
          onLeftIconButtonClick={() => this.handleToggle()}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
>>>>>>> 3b337d3cb88bd536d973beb9c19f4f11aa6f17c5
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
