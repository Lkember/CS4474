/**
 * @file: MainMenu.js
 * Purpose: Game state to display game's main menu
 * Authors: Jieni Hou, Jason Lee, Jose Rivera
 * Language: ES6
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {}

    //Load visual and audio scene assets to display
    preload () {
      this.load.audio('test',['../../assets/fx/dk.mp3'])
      this.load.image('Background', '../../assets/images/background_menu.png')
      this.load.image('Button', '../../assets/images/start_button.png')
    }

    create () {
      //-------------------------------------------MENU MUSIC COMPONENT---------------------------------------
      //Play audio file and loop
      var music = this.game.add.audio('test')
      //music.play();
      //music.loop = true;

      //----------------------------------------------UI COMPONENT---------------------------------------------
      //Set menu background and scale to display
      var Background = this.add.image(0, 0, 'Background')
      Background.width = this.world.width
      Background.height = this.world.height

      //Display game title (NEEDS STYLING**)
      var text = this.add.text(this.world.centerX, this.world.centerY/4,"Arithmetic Monkeys",
          {font: "60px Arial",
           fontWeight: "bold",
           fill: "#FFD700",
           boundsAlignH:"right"})
      text.anchor.setTo(0.5, 0.5)

      //Display start button to enter game selection
      this.Start_Button = this.add.button(this.world.centerX, this.world.centerY + (this.world.centerY/4), 'Button', actionOnClick, this)
      this.Start_Button.anchor.setTo(0.5, 0.5)
    }

    update(){
      if (this.Start_Button.input.pointerOver())
      {
          this.Start_Button.scale.setTo(1.1,1.1)
      }
      else
      {
          this.Start_Button.scale.setTo(1,1)
      }
    }
}

//Function called on START button to proceed to 'GameSelect' screen
function actionOnClick () {
  this.state.start('GameSelect')
}
