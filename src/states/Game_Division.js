import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
    }

    preload () {
        this.load.image('Desert', '../../assets/images/background_desert.png')
        this.load.image('Arrow', '../../assets/images/arrow_brown.png')
    }

    create () {
        this.image = this.add.image(0, 0, 'Desert')

        this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
    }

}

function actionGoBack () {
    this.state.start('GameSelect')
}