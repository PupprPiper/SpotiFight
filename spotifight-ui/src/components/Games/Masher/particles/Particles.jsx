import React, {Component} from "react";
import Particles from 'react-particles-js';
import "./Particles.scss";
import pSetup from './pSetup.js'



export default class Particle extends Component {
  constructor(props) {
    super(props)

    this.state = {}

  }



  render(jsParticles) {
    const str = this.props.userProfile.avatar_url
    const avatar = str.substring(0, str.length - 1)
    return (<div>
      <Particles id="particle-hook" params={pSetup(avatar)} />
      </div>)
  }

}
// userProfile={this.props.userProfile}
