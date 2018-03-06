/**
 * @file: Fact_Difficulty.js
 * Purpose: Game state to select factoring game difficulty
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
        this.load.image('Diff_1', '../../assets/images/fact_dif_1.png')
        this.load.image('Diff_2', '../../assets/images/button_locked.png')
        this.load.image('Diff_3', '../../assets/images/button_locked.png')
    }

    create() {
        //----------------------------------------------UI COMPONENT---------------------------------------------
        //Display background in scene and scale to world size
        var Background = this.add.image(0, 0, 'Background')
        Background.width = this.world.width
        Background.height = this.world.height

        //Text instruction for user to select a difficulty(NEEDS STYLING*)
        var text = this.add.text(this.world.centerX * 0.65,this.world.centerY/4,"Select A Difficulty",
            {font: "60px Arial",
                fontWeight: "bold",
                fill: "#FFD700",
                boundsAlignH:"right"})

        //Display 3 buttons for difficulty selection (Latter 2 options grayed out at beggining)
        this.add.button(this.world.centerX * 0.70, this.world.centerY, 'Diff_1', actionOnClickFact, this)
        this.add.button(this.world.centerX * 0.70, this.world.centerY * 1.3, 'Diff_2', actionOnClickMult, this)
        this.add.button(this.world.centerX * 0.70, this.world.centerY * 1.6, 'Diff_3', actionOnClickDiv, this)
    }

}

//Function called on button to begin FACTORING game with difficulty 1
function actionOnClickFact() {
    this.state.start('Game_Factoring')
}

//Function called on button to begin FACTORING game with difficulty 2 (Locked)
function actionOnClickMult() {
    console.log("Difficulty 2 Locked")
}

//Function called on button to begin FACTORING game with difficulty 3 (Locked)
function actionOnClickDiv() {
    console.log("Difficulty 3 Locked")
}
