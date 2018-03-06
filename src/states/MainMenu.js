import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
  }

  preload () {
      this.load.audio('test',['../../assets/fx/dk.mp3'])
    this.load.image('Background', '../../assets/images/background_menu.png')
    this.load.image('Button', '../../assets/images/start_button.png')
  }

  create () {
      var music = this.game.add.audio('test')
      music.play();
      music.loop = true;

    var Background = this.add.image(0, 0, 'Background')
      Background.width = this.world.width
      Background.height = this.world.height

      var text = this.add.text(this.world.centerX * 0.65, this.world.centerY/4,"Arithmetic Monkeys",
          {font: "60px Arial",
              fontWeight: "bold",
              fill: "#FFD700",
              boundsAlignH:"right"})

    this.add.button(this.world.centerX - 135, this.world.centerY + (this.world.centerY/4), 'Button', actionOnClick, this)
  }
}

function actionOnClick () {
  this.state.start('GameSelect')
}
