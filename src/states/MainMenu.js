import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.load.image('Background', '../../assets/images/background_menu.png')
    this.load.image('Button', '../../assets/images/start_button.png')
  }

  create () {
    this.image = this.add.image(0, 0, 'Background')
    this.add.button(this.world.centerX - 135, 225, 'Button', actionOnClick, this)
  }
}

function actionOnClick () {
  this.state.start('GameSelect')
}
