import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MenuIcon } from './components/Global/Material-Globals';
import { toggleMenu } from './actions/index';

import TitleBar from './components/Global/TitleBar/titleBar';
import Sidebar from './components/Global/Sidebar/Sidebar';
import appRoutes from './routes';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()

    this.state = {


    }
this.authCheck = this.authCheck.bind(this);


  }




  handleToggle() {
    this.props.toggleMenu(!this.props.menuIsOpen);
    console.log(this.props.menuIsOpen);
  }

  componentDidMount() {
    this.authCheck();

  }


  authCheck() {
    const token = localStorage.getItem('token')
    console.log(token);

    axios.post('auth/isLoggedIn', {token: token})
    .then((data) => {
      console.log('auth token has been sent to the server');
    })


  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <TitleBar
              title="Spotifight"
              handleCLick={() => this.handleToggle()}
              color="inherit"
              Icon={MenuIcon}
            />
            <Sidebar />
            <Switch>
              {appRoutes.map((route, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
