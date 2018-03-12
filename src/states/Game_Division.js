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
        this.load.image('Pause', '../../assets/images/pause_brown.png')
    }

    create () {
        //----------------------------------------------UI COMPONENT------------------------------------------
        //Display background in scene
        this.background = this.add.image(0, 0, 'Desert')

        //Creation of arrow button to exit state and return to game selection
        this.Back_Arrow = this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
        this.Back_Arrow.anchor.setTo(0.5, 0.5)
         //--------------------------------------------PAUSE MENU COMPONENT------------------------------------------
         var w = this.world.width, h = this.world.height;
         var menu, choiseLabel;
         
         //Create a label to use as a button
         this.pause_label = this.add.image(this.world.centerX * 1.9 , this.world.centerY * 0.1, 'Pause')
         this.pause_label.anchor.setTo(0.5, 0.5)
         this.pause_label.inputEnabled = true;
 
         this.pause_label.events.onInputUp.add(function () {
             //When the pause button is pressed, we pause the game
             game.paused = true;
             //Then add the menu
             menu = game.add.sprite(w/2, h/2, 'menu');
             menu.anchor.setTo(0.5, 0.5);
             // And a label to illustrate which menu item was chosen. (This is not necessary)
             choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
             choiseLabel.anchor.setTo(0.5, 0.5);
         });
 
         //Add a input listener that can help us return from being paused
         game.input.onDown.add(unpause, self);
 
         //And finally the method that handels the pause menu
         function unpause(event){
             //Only act if paused
             if(game.paused){
                 //Calculate the corners of the menu
                 var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                     y1 = h/2 - 180/2, y2 = h/2 + 180/2;
 
                 //Check if the click was inside the menu
                 if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                     //The choicemap is an array that will help us see which item was clicked
                     var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];
 
                     //Get menu local coordinates for the click
                     var x = event.x - x1,
                         y = event.y - y1;
 
                     //Calculate the choice
                     var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);
 
                     //Display the choice
                     choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
                 }
                 else{
                     //Remove the menu and the label
                     menu.destroy();
                     choiseLabel.destroy();
 
                     //Unpause the game
                     game.paused = false;
                 }
             }
         };       
    }

    update(){
               //Back arrow scale on hover
               if (this.Back_Arrow.input.pointerOver())
               {
                   this.Back_Arrow.scale.setTo(1.1,1.1)
               }
               else
               {
                   this.Back_Arrow.scale.setTo(1,1)
               }
       
               //Pause button scale on hover
               if (this.pause_label.input.pointerOver())
               {
                   this.pause_label.scale.setTo(1.1,1.1)
               }
                   else
               {
                   this.pause_label.scale.setTo(1,1)
               }
    }

}

//Function called on ARROW button to return to 'GameSelect' screen
function actionGoBack () {
    this.state.start('GameSelect')
}