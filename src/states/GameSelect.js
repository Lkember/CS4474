import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
    }

    preload() {
        this.load.image('Background', '../../assets/images/background_menu.png')
        this.load.image('Button1', '../../assets/images/start_button.png')
        this.load.image('Button2', '../../assets/images/start_button.png')
        this.load.image('Button3', '../../assets/images/start_button.png')
    }

    create() {
        this.image = this.add.image(0, 0, 'Background')
        this.add.button(this.world.centerX - 135, 100, 'Button1', actionOnClickFact, this)
        this.add.button(this.world.centerX - 135, 200, 'Button2', actionOnClickMult, this)
        this.add.button(this.world.centerX - 135, 300, 'Button3', actionOnClickDiv, this)
    }

}

    function actionOnClickFact() {
        this.state.start('Game_Factoring')
    }

    function actionOnClickMult() {
        this.state.start('Game_Multiplication')
    }

    function actionOnClickDiv() {
            this.state.start('Game_Division')
    }

