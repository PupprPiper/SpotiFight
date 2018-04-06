import React, { Component } from 'react';
import Verify from '../Auth/Verify.jsx';
import './LandingPage.scss';
import Tutorial from './Tutorial.jsx';
import Arrow from './Arrow.jsx';
import $ from 'jquery';
import Logo from './images/final_logo.png'

export default class LandingPage extends Component {

constructor(props) {
  super(props)

  this.state = {

  }



}




  render() {
    return (
      <div>

      <div className= 'background landingpage'>
      {/* <audio
 className="landingpagesong"
 src="https://vocaroo.com/media_command.php?media=s1bgaXnLcMJp&command=download_mp3" autoPlay="autoPlay"
  />  */}
      <div className="text">
<img className="logo" align="center" width="120px" src={Logo}/>
       <br /> <b><span className="landing-title">SPOTIFIGHT</span>

      </b> </div>

      <main>

      </main>
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
      </div>
      <Arrow />
      <Tutorial />
      </div>
      )
  }
}
