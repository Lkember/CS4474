/**
 * @file: Game_Division.js
 * Purpose: Game instance for division game
 * Authors: Jieni Hou, Jason Lee, Jose Rivera
 * Language: ES6
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
    }

    //Load scene assets to display
    preload () {
        this.load.image('Desert', '../../assets/images/background_desert.png')
        this.load.image('Arrow', '../../assets/images/arrow_brown.png')
    }

    create () {
        //----------------------------------------------UI COMPONENT------------------------------------------
        //Display background in scene
        this.image = this.add.image(0, 0, 'Desert')

        //Creation of arrow button to exit state and return to game selection
        this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
    }

}

//Function called on ARROW button to return to 'GameSelect' screen
function actionGoBack () {
    this.state.start('GameSelect')
}