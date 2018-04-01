import React, { Component } from 'react';
import Verify from '../Auth/Verify.jsx';
import './LandingPage.scss'
export default class LandingPage extends Component {
  render() {
    return (
      
      <div className = 'background landingpage'> 
      <div className="text"> the <br /> <b>SPOTIFIGHT</b> </div>
      <main></main>
      <div className="grid">
        <div className="grid-inner">
          <div className="hori">
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
      <Verify history={this.props.history}  />
      </div>
      )
  }
}
