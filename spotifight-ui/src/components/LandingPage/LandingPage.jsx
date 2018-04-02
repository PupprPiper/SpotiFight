import React, { Component } from 'react';
import Verify from '../Auth/Verify.jsx';
import './LandingPage.scss';
import Tutorial from './Tutorial.jsx';
import Arrow from './Arrow.jsx';
import $ from 'jquery';

export default class LandingPage extends Component {

constructor(props) {
  super(props)

  this.state = {

  }



}




  render() {
    return (
      <div>

      <div class = 'background landingpage'>

      <div class="text">
<img className="logo" align="center" width="120px" src="https://i.imgur.com/t07Faks.png"/>
       <br /> <b><span className="landing-title">SPOTIFIGHT</span>

      </b> </div>

      <main>

      </main>
      <div class="grid">
        <div class="grid-inner">
          <div class="hori">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <div className="vert">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

        </div>

      </div>
      </div>
      <Arrow />
      <Tutorial />
      </div>
      )
  }
}
