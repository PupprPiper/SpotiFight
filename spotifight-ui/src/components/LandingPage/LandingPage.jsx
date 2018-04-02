import React, { Component } from 'react';
import Verify from '../Auth/Verify.jsx';
import './LandingPage.scss'
export default class LandingPage extends Component {
  render() {
    return (
      
      <div className = 'background landingpage'> 
      <audio className = "landingpagesong" src = 'https://vocaroo.com/media_command.php?media=s1bgaXnLcMJp&command=download_mp3' autoPlay="autoPlay" /> 
      
      <div class="text"> the <br /> <b>SPOTIFIGHT</b> </div>
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
