import React, { Component } from 'react';
import Verify from '../Auth/Verify.jsx';
import './LandingPage.scss'
export default class LandingPage extends Component {
  render() {
    return (
      
      <div className = 'background landingpage'> 
      <div class="text"> the <br /> <b>SPOTIFIGHT</b> </div>
      <main></main>
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
          <div class="vert">
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
        </div>
      </div>
      <Verify history={this.props.history}  />
      </div>
      )
  }
}
