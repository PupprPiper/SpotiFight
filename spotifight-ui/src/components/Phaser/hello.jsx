import React, { Component } from 'react';
import Phaser from 'Phaser';
import _throttle from 'lodash.throttle';



export default class Hello extends Component {

  constructor(props) {
    super(props);

    this.state = {
      w: 600, h: 600, // initial app dimention values (temp state before onResize handler will be called after componentDidMount)
    };

    this.onResize = this.onResize.bind(this)

  }


  // React Component LifeCycle

  componentDidMount() {

    window.addEventListener('resize', _throttle(this.onResize, 0.5 * 1000), false);
    const { w, h } = this.onResize(); // trigger handler first time

    let config = {
      width: w,
      height: h,
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 200 } }
      },
      scene: { preload, create },
      parent: this.phaserEl
    };


    //let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
    let game = new Phaser.Game(config);


    function preload() {
      //this.load.setBaseURL(`http://` + SERVER_HOST);
      this.load.setBaseURL(``);
      this.load.image('bomb', 'assets/bomb.jpg');

    }

    function create() {


      var s = game.add.sprite(80, 0, 'bomb');

     s.rotation = 0.14;


    }
  }



  componentDidCatch(error, info) { console.warn(error, info); }

  render() {
    return (
      <div className="AppComponent">
        <div className="grid">
          <div ref={el => this.phaserEl = el} />
          <div>
            <h4>Controls</h4>
          </div>
        </div>
      </div>
    );
  }

  // Helpers

  onResize() {
    if (!this.phaserEl) { return console.warn(`     resize > phaserEl is 'undefined'`); }
    const w = this.phaserEl.offsetWidth;
    const h = this.phaserEl.offsetHeight;
    console.log(`     resize > ${w}x${h}`);
    this.setState({ w, h });
    return { w, h };
  }

}
