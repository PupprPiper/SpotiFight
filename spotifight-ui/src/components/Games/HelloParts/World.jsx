import React, {Component} from 'react';
import {Loop, Stage, World, Sprite} from 'react-game-kit';
import Matter from 'matter-js';

class WorldExample extends Component {
  physicsInit (engine) {
    const ground = Matter.Bodies.rectangle(
      512, 448,
      1024, 64,
      {
        isStatic: true,
      },
    );

    Matter.World.addBody(engine.world, ground);
  }
  render() {
    return <World onInit={()=> this.physicsInit}/>;
  }
}

export default WorldExample;
