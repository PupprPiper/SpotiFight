class Example1 extends Phaser.Scene {
  constructor() {
    super({
      key: 'Example1'
    })
  }

  preload() {
    this.load.image('sky', './assets/sky.png');
  }

  create() {

    this.image = this.add.image(400, 200, 'sky');
  }
}
