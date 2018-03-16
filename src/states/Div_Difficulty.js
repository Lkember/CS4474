/**
 * @file: Div_Difficulty.js
 * Purpose: Game state to select division game difficulty
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
        this.load.image('Diff_1', '../../assets/images/div_dif_1.png')
        this.load.image('Diff_2', '../../assets/images/button_locked.png')
        this.load.image('Diff_3', '../../assets/images/button_locked.png')
        this.load.image('Arrow', '../../assets/images/arrow_brown.png')
    }

    create() {
        //----------------------------------------------UI COMPONENT---------------------------------------------
        //Display background in scene and scale to world size
        var Background = this.add.image(0, 0, 'Background')
        Background.width = this.world.width
        Background.height = this.world.height

        this.Back_Arrow = this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
        this.Back_Arrow.anchor.setTo(0.5, 0.5)

        //Text instruction for user to select a difficulty(NEEDS STYLING*)
        var text = this.add.text(this.world.centerX * 0.65,this.world.centerY/4,"Select A Difficulty",
            {font: "60px Arial",
                fontWeight: "bold",
                fill: "#FFD700",
                boundsAlignH:"right"})

        //Display 3 buttons for difficulty selection (Latter 2 options grayed out at beggining)
        this.Diff_1_Button = this.add.button(this.world.centerX, this.world.centerY, 'Diff_1', actionOnClickFact, this)
        this.Diff_2_Button = this.add.button(this.world.centerX , this.world.centerY * 1.3, 'Diff_2', actionOnClickMult, this)
        this.Diff_3_Button = this.add.button(this.world.centerX , this.world.centerY * 1.6, 'Diff_3', actionOnClickDiv, this)

        this.Diff_1_Button.anchor.setTo(0.5, 0.5)
        this.Diff_2_Button.anchor.setTo(0.5, 0.5)
        this.Diff_3_Button.anchor.setTo(0.5, 0.5)
    }

    update(){
        //Scale difficulty 1 button up when hovering over
        if (this.Diff_1_Button.input.pointerOver())
        {
            this.Diff_1_Button.scale.setTo(1.1,1.1)
        }
        else
        {
            this.Diff_1_Button.scale.setTo(1,1)
        }
    }

}

//Function called on button to begin DIVISION game with difficulty 1
function actionOnClickFact() {
    this.state.start('Game_Division')
}

//Function called on button to begin DIVISION game with difficulty 2 (Locked)
function actionOnClickMult() {
      if(this.game.global.unlockDiv2 == false){
         console.log("Difficulty 2 Locked")
         }
        else{
        this.state.start('Game_Division')
    }
}

//Function called on button to begin DIVISION game with difficulty 3 (Locked)
function actionOnClickDiv() {
    if(this.game.global.unlockDiv3 == false){
         console.log("Difficulty 3 Locked")
     }
   else{
       this.state.start('Game_Division')
    }
}

//Function called on ARROW button to return to 'GameSelect' screen
function actionGoBack () {
    this.state.start('GameSelect')
}