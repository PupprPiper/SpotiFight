import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, history } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MenuIcon } from './components/Global/Material-Globals';
import { toggleMenu } from './actions/index';

import AppTitleBar from './components/Global/TitleBar/appTitleBar';
import Sidebar from './components/Global/Sidebar/Sidebar';
import appRoutes from './routes';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    const { email } = JSON.parse(localStorage.getItem('user')) || { email: '' };
  }

  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
    console.log(this.props.menuIsOpen);
  }

  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppTitleBar
            title="Spotifight"
            handleCLick={() => this.handleToggle()}
            color="inherit"
            Icon={MenuIcon}
          />
          <Sidebar />
          <Switch>
            {appRoutes.map((route, index) => {
              if (Route.path === '/user-profile/') {
                Route.path = Route.path + this.email;
              }
              return (
                <Route
                  path={route.path}
                  component={route.component}
                  key={index}
                />
              );
            })}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = function(state) {
  return { menuIsOpen: state.menuIsOpen };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      toggleMenu
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
