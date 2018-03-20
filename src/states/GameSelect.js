/**
 * @file: GameSelect.js
 * Purpose: Game state to select game type between factoring,
 *          multiplication and division
 * Authors: Jieni Hou, Jason Lee, Jose Rivera
 * Language: ES6
 */
import Phaser from 'phaser'
// import globals from './globals/index'
// import { clone } from 'lodash'

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
        //Setting the global variables
        //this.game.global = clone(globals)
        //console.log("This is the globals within GameSelect:" + this.game.global.level)

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
        this.Factor_Button = this.add.button(this.world.centerX , this.world.centerY, 'ButtonFactor', actionOnClickFact, this)
        this.Mult_Button = this.add.button(this.world.centerX , this.world.centerY * 1.3, 'ButtonMult', actionOnClickMult, this)
        this.Div_Button = this.add.button(this.world.centerX , this.world.centerY * 1.6, 'ButtonDiv', actionOnClickDiv, this)

        this.Factor_Button.anchor.setTo(0.5,0.5)
        this.Mult_Button.anchor.setTo(0.5,0.5)
        this.Div_Button.anchor.setTo(0.5,0.5)
    }

    update(){
        //Scale Factor button up when hovering over
        if (this.Factor_Button.input.pointerOver())
        {
            this.Factor_Button.scale.setTo(1.1,1.1)
        }
        else
        {
            this.Factor_Button.scale.setTo(1,1)
        }

        //Scale Mult button up when hovering over
        if (this.Mult_Button.input.pointerOver())
        {
            this.Mult_Button.scale.setTo(1.1,1.1)
        }
        else
        {
            this.Mult_Button.scale.setTo(1,1)
        }

        //Scale Div button up when hovering over
        if (this.Div_Button.input.pointerOver())
        {
            this.Div_Button.scale.setTo(1.1,1.1)
        }
        else
        {
            this.Div_Button.scale.setTo(1,1)
        }

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

