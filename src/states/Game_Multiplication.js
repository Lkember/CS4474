/**
 * @file: Game_Multiplication.js
 * Purpose: Game instance for multiplication game
 * Authors: Jieni Hou, Jason Lee, Jose Rivera
 * Language: ES6
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
    }

    //Load scene assets to display
    preload () {
        this.load.image('Ice', '../../assets/images/background_ice.jpg')
        this.load.image('Arrow', '../../assets/images/arrow_blue.png')
    }

    create () {
        //----------------------------------------------UI COMPONENT---------------------------------------------
        //Display background in scene
        this.image = this.add.image(0, 0, 'Ice')

        //Creation of arrow button to exit state and return to game selection
        this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
    }
}

//Function called on ARROW button to return to 'GameSelect' screen
function actionGoBack () {
    this.state.start('GameSelect')
}
