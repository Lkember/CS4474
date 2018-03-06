/**
 * @file: GameSelect.js
 * Purpose: Game state to select game type between factoring,
 *          multiplication and division
 * Authors: Jieni Hou, Jason Lee, Jose Rivera
 * Language: ES6
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
    }

    //Load scene assets to display
    preload() {
        this.load.image('Background', '../../assets/images/background_menu.png')
        this.load.image('ButtonFactor', '../../assets/images/button_factor.png')
        this.load.image('ButtonMult', '../../assets/images/button_multiply.png')
        this.load.image('ButtonDiv', '../../assets/images/button_divide.png')
    }

    create() {
        //----------------------------------------------UI COMPONENT---------------------------------------------
        //Display background and scale to world window
        var Background = this.add.image(0, 0, 'Background')
        Background.width = this.world.width
        Background.height = this.world.height

        //Display instruction to select game (NEEDS STYLING**)
        var text = this.add.text(this.world.centerX * 0.70,this.world.centerY/4,"Select A Game",
            {font: "60px Arial",
                fontWeight: "bold",
                fill: "#FFD700",
                boundsAlignH:"right"})

        //Display game buttons representing FACTORING, MULTIPLICATION & DIVISION
        this.add.button(this.world.centerX * 0.65, this.world.centerY, 'ButtonFactor', actionOnClickFact, this)
        this.add.button(this.world.centerX * 0.65, this.world.centerY * 1.3, 'ButtonMult', actionOnClickMult, this)
        this.add.button(this.world.centerX * 0.65, this.world.centerY * 1.6, 'ButtonDiv', actionOnClickDiv, this)
    }

}

//Function called on FACTOR button to proceed to difficulty selection
function actionOnClickFact() {
    this.state.start('Fact_dif')
}

//Function called on MULTIPLICATION button to proceed to difficulty selection
function actionOnClickMult() {
    this.state.start('Mult_dif')
}

//Function called on DIVISION button to proceed to difficulty selection
function actionOnClickDiv() {
    this.state.start('Div_dif')
}

