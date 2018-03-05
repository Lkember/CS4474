import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
    }

    preload () {
        this.load.image('Desert', '../../assets/images/background_desert.jpg')
        this.load.image('Arrow', '../../assets/images/arrow.png')
    }

    create () {
        this.image = this.add.image(0, 0, 'Desert')

        this.add.button(this.world.centerX - 350, 30, 'Arrow', actionGoBack, this)
    }

}

function actionGoBack () {
    this.state.start('GameSelect')
}
