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

  render() {
    const str = this.props.userProfile.avatar_url
    const avatar = str.substring(0, str.length - 1)
    console.log(avatar)
    console.log(pSetup(avatar))
    return (<div>
      <Particles id="particle-hook" params={pSetup(avatar)} />
      </div>)
  }

}
