import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
    }

    preload() {
        this.load.image('Background', '../../assets/images/background_menu.png')
        this.load.image('Diff_1', '../../assets/images/mult_dif_1.png')
        this.load.image('Diff_2', '../../assets/images/button_locked.png')
        this.load.image('Diff_3', '../../assets/images/button_locked.png')
    }

    create() {
        var Background = this.add.image(0, 0, 'Background')
        Background.width = this.world.width
        Background.height = this.world.height

        var text = this.add.text(this.world.centerX * 0.65,this.world.centerY/4,"Select A Difficulty",
            {font: "60px Arial",
                fontWeight: "bold",
                fill: "#FFD700",
                boundsAlignH:"right"})

        this.add.button(this.world.centerX * 0.70, this.world.centerY, 'Diff_1', actionOnClickFact, this)
        this.add.button(this.world.centerX * 0.70, this.world.centerY * 1.3, 'Diff_2', actionOnClickMult, this)
        this.add.button(this.world.centerX * 0.70, this.world.centerY * 1.6, 'Diff_3', actionOnClickDiv, this)
    }

}

function actionOnClickFact() {
    this.state.start('Game_Multiplication')
}

function actionOnClickMult() {
    console.log("Difficulty 2 Locked")
}

function actionOnClickDiv() {
    console.log("Difficulty 3 Locked")
}
