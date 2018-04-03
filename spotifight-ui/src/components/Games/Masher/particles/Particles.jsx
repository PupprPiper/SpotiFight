import React, {Component} from "react";
import Particles from 'react-particles-js';
import "./Particles.scss";
import pSetup from './pSetup.js'



export default class Particle extends Component {
  constructor(props) {
    super(props)

    this.state = {}

  }


shouldComponentUpdate() {
  return false;
}


  render(jsParticles) {
    return (<div>
      <Particles id="particle-hook" params={pSetup} />
      </div>)
  }

}
