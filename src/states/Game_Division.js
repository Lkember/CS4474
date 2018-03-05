import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
    }

    preload () {
        this.load.image('Ice', '../../assets/images/background_ice.jpg')
        this.load.image('Arrow', '../../assets/images/arrow.png')
    }

    create () {
        this.image = this.add.image(0, 0, 'Ice')

        this.add.button(this.world.centerX - 350, 30, 'Arrow', actionGoBack, this)
    }
}

function actionGoBack () {
    this.state.start('GameSelect')
}
