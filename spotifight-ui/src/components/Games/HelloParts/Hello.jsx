import React, {Component} from 'react';
import {Loop, Stage, World, Sprite, Body} from 'react-game-kit';
import WorldExample from './HelloParts/World.jsx'
import PropTypes from 'proptypes';

const contextTypes = {
  loop: PropTypes.object
};


export default class Hello extends Component {
  constructor() {
    super()
    this.state = {}
  }



  render() {
    return (<Loop>
      <Stage width={800} height={600}>
        <World>
          <Body args={[0, 0, 75, 75]} ref={(b) => this.body = b.body}>
            <Sprite repeat={true} src="./assets/mysprite.png" scale={this.context.scale * 2} state={0} steps={[9, 9, 0, 4, 5]}/> </Body></World>
          </Stage>
        </Loop>);
  }
}
