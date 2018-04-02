import React, { Component } from "react";
import Verify from "../Auth/Verify.jsx";
import "./LandingPage.scss";
import Tutorial from "./Tutorial.jsx";
import Arrow from "./Arrow.jsx";
import $ from "jquery";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div class="background landingpage">
          <audio
            className="landingpagesong"
            src="https://vocaroo.com/media_command.php?media=s1bgaXnLcMJp&command=download_mp3"
            autoPlay="autoPlay"
          />
          <div class="text">
            <img
              className="logo"
              align="center"
              width="120px"
              src="https://i.imgur.com/t07Faks.png"
            />
            <br />{" "}
            <b>
              <span className="landing-title">SPOTIFIGHT</span>
            </b>{" "}
          </div>

          <main />
          <div class="grid">
            <div class="grid-inner">
              <div class="hori">
                <div class="line" />
                <div class="line" />
                <div class="line" />
                <div class="line" />
                <div class="line" />
                <div class="line" />
                <div class="line" />
                <div class="line" />
                <div class="line" />
                <div class="line" />
                <div class="line" />
              </div>
              <div className="vert">
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
              </div>
            </div>
          </div>
        </div>
        <Arrow />
        <Tutorial />
      </div>
    );
  }
}
