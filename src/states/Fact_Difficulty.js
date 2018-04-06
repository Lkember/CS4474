/**
 * @file: Fact_Difficulty.js
 * Purpose: Game state to select factoring game difficulty
 * Authors: Jieni Hou, Jason Lee, Jose Rivera, Logan Kember
 * Language: ES6
 */
import Phaser from 'phaser'

var confirm_sound
var cancel_sound

export default class extends Phaser.State {
    init() {
    }

    //Load scene assets to display
    preload() {
        this.load.audio('confirm',['../../assets/fx/selection1.mp3', 'confirm','../../assets/fx/selection1.ogg'])
        this.load.audio('cancel',['../../assets/fx/cancel1.wav', '../../assets/fx/cancel1.wav'])
        this.load.image('Background', '../../assets/images/background_menu.png')
        this.load.image('unlock', '../../assets/images/fact_dif_1.png')
        this.load.image('unlock2', '../../assets/images/fact_dif_2.png')
        this.load.image('unlock3', '../../assets/images/fact_dif_3.png')
        this.load.image('Diff_2', '../../assets/images/button_locked.png')
        this.load.image('Diff_3', '../../assets/images/button_locked.png')
        this.load.image('Arrow', '../../assets/images/arrow_yellow.png')
    }

    create() {
        confirm_sound = this.game.add.audio('confirm')
        cancel_sound = this.game.add.audio('cancel')
        //----------------------------------------------UI COMPONENT---------------------------------------------
        //Display background in scene and scale to world size
        var Background = this.add.image(0, 0, 'Background')
        Background.width = this.world.width
        Background.height = this.world.height

         //Creation of arrow button to exit state and return to game selection
        this.Back_Arrow = this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
        this.Back_Arrow.anchor.setTo(0.5, 0.5)

        //Text instruction for user to select a difficulty(NEEDS STYLING*)
        var text = this.add.text(this.world.centerX * 0.65,this.world.centerY/4,"Select A Difficulty",
            {font: "60px Arial",
                fontWeight: "bold",
                fill: "#FFD700",
                boundsAlignH:"right"})

        //Display 3 buttons for difficulty selection (Latter 2 options grayed out at beggining)
        this.Diff_1_Button = this.add.button(this.world.centerX , this.world.centerY, 'unlock', actionOnClickFact, this)
        if(this.game.global.unlockFactor2 == true){
            this.Diff_2_Button = this.add.button(this.world.centerX , this.world.centerY * 1.3, 'unlock2', actionOnClickMult, this)
        }
        else{
            this.Diff_2_Button = this.add.button(this.world.centerX , this.world.centerY * 1.3, 'Diff_2', actionOnClickMult, this)
        }
        if(this.game.global.unlockFactor3 == true){
            this.Diff_3_Button = this.add.button(this.world.centerX , this.world.centerY * 1.6, 'unlock3', actionOnClickDiv, this)
        }
        else{
            this.Diff_3_Button = this.add.button(this.world.centerX , this.world.centerY * 1.6, 'Diff_3', actionOnClickDiv, this)
        }

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
        if(this.game.global.unlockFactor2 == true && this.Diff_2_Button.input.pointerOver()){
            this.Diff_2_Button.scale.setTo(1.1,1.1)
        }
        else{
            this.Diff_2_Button.scale.setTo(1,1)
        }
        if(this.game.global.unlockFactor3 == true && this.Diff_3_Button.input.pointerOver()){
            this.Diff_3_Button.scale.setTo(1.1,1.1)
        }
        else{
            this.Diff_3_Button.scale.setTo(1,1)
        }
    }

}

//Function called on button to begin FACTORING game with difficulty 1
function actionOnClickFact() {
    confirm_sound.play()
    this.game.global.factLevel = 1
    this.state.start('Game_Factoring')
}

//Function called on button to begin FACTORING game with difficulty 2 (Locked)
function actionOnClickMult() {
   if(this.game.global.unlockFactor2 == false){
         console.log("Difficulty 2 Locked")
    }
    else{
        confirm_sound.play()
        this.game.global.factLevel = 2
        this.state.start('Game_Factoring')
    }
}

//Function called on button to begin FACTORING game with difficulty 3 (Locked)
function actionOnClickDiv() {
    if(this.game.global.unlockFactor3 == false){
         console.log("Difficulty 3 Locked")
    }
    else{
        confirm_sound.play()
        this.game.global.factLevel = 3
       this.state.start('Game_Factoring')
    }
}

//Function called on ARROW button to return to 'GameSelect' screen
function actionGoBack () {
    cancel_sound.play()
    this.state.start('GameSelect')
}
