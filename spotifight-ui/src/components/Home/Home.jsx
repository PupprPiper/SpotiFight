import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import randomstring from "randomstring";
import io from "socket.io-client";
import Button from "material-ui/Button";
import Masher from "../Games/Masher/Masher";
import { gameSwitch } from "../../actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MusicTrivia from "../Games/MusicTrivia/MusicTrivia";
import "./Home.scss";
import RPSLS from "../Games/RPSLS/rpsls";
import axios from "axios";
import Verify from "../Auth/Verify.jsx";

import GameList from "./GameList.jsx";
import { Grid } from "../Global/Material-Globals";
import OpenRoomsList from "./OpenRoomsList.jsx";
import "./Home.scss";
import Carousel from "nuka-carousel";
import SimpleSnackbar from "./Snackbar.jsx";
import $ from "jquery";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.game,
      openrooms: [],
      people: []
    };
  }

  //jQuery function to force to top of the page onload
  componentDidMount() {
    $(window).scrollTop(0);
  }

  //Connect to socket so we can see who is currently playing and how many lobbys are open
  componentWillMount() {
    this.socket = io.connect("http://localhost:8000");
    this.socket.on("OPEN_ROOMS", data => {
      this.setState({ openrooms: data });
    });

    this.socket.on("NUMBER_OF_PEOPLE", data => {
      this.setState({ people: data });
    });
  }

  //Joins selected room
  handleRoomSelect(room) {
    this.props.history.push({ pathname: `/game-room/${room}` });
  }

  //disconnects from socket when you leave the page
  componentWillUnmount() {
    this.socket.disconnect();
    this.props.history.forced = false;
  }

  render() {
    return (
      <div align="center" className="top-margin" style={{ padding: "10px" }}>

        { //alerts all users that the reason they've been kicked out is due to the host leaving
          this.props.history.action === "PUSH" &&
        this.props.history.forced === true ? (
          <SimpleSnackbar />
        ) : null}
        <div>Select a game:</div>

        <GameList history={this.props.history} align="center" />
        <div>
          {/* Shows number of current players in number of current rooms */}
          <div align="left"> Open Rooms:</div>
          <OpenRoomsList
            openrooms={this.state.openrooms}
            history={this.props.history}
            people={this.state.people}
          />
        </div>

        <Verify history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {game: state.game, userProfile: state.userProfile, globalPlayers: state.globalPlayers};
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({
    gameSwitch
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
