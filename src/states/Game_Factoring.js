/**
 * @file: Game_Factoring.js
 * Purpose: Game instance for factoring game
 * Authors: Jieni Hou, Jason Lee, Jose Rivera
 * Language: ES6
 */
import Phaser from 'phaser'
import { stringify } from 'querystring';
import globals from './globals/index'
import { clone } from 'lodash'

var Queue_Num = 0;

export default class extends Phaser.State {
    
    init() {
    }

    //Load scene assets to display
    preload() {
        this.load.image('Jungle', '../../assets/images/background_jungle.jpg')
        this.load.image('Banana', '../../assets/images/banana_small.png')
        this.load.image('ProfMonkey', '../../assets/images/prof-monkey.png')
        this.load.image('Arrow', '../../assets/images/arrow_yellow.png')
        this.load.image('Pause', '../../assets/images/pause_yellow.png')
        this.load.image('menu', '../../assets/images/pause-b.png')
        this.load.spritesheet('Monkey', '../../assets/images/user-monkey-spritesheet.png',228 ,305, 4)
    }

    create() {

        //----------------------------------------------UI COMPONENT---------------------------------------------
        //Display background in scene
        var Background = this.add.image(0, 0, 'Jungle')

        //Apply ARCADE physics for all game components in this state
        this.physics.startSystem(Phaser.Physics.ARCADE)

        //Add the professor monkey
        var profMonkey = this.add.image(0, this.world.centerY * 0.2, 'ProfMonkey')
        profMonkey.inputEnabled = true;

        //Reference Monkey sprite sheet as image of game and bring into the scene and animate
        this.UserMonkey = this.add.sprite(this.world.centerX, this.world._height, 'Monkey')
        this.UserMonkey.anchor.setTo(0.5, 0.5)
        this.UserMonkey.animations.add('walk')
        this.UserMonkey.animations.play('walk', 5, true)

 
        //Enable body property and ARCADE physics on monkey sprite
        this.UserMonkey.enableBody = true
        this.physics.enable(this.UserMonkey, Phaser.Physics.ARCADE)
        
        //Collider to keep monkey in bounds
        this.UserMonkey.body.collideWorldBounds = true

        //Creation of arrow button to exit state and return to game selection
        this.Back_Arrow = this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
        this.Back_Arrow.anchor.setTo(0.5, 0.5)

        //-----------------------------------------------GAME LOGIC----------------------------------------------
        var level = getLevel(this.game.global.factLevel)
        this.queue = []

        var number_eq = level[this.rnd.integerInRange(0,level.length-1)]
        console.log("The number to factor: " + number_eq)
        for(var i=1; i<=number_eq; i++){
            if (number_eq % i == 0){
                this.queue.push(i)
                console.log("# is factor: " + i)
            }
        }
        this.add.text(this.world.centerX, 0, String(number_eq),{font:"20px Arial", fill:"#FFFFFF"})

        //---------------------------------------------BANANA COMPONENTS-----------------------------------------
        //Spawn Banana at top boundary of world at random x co-ordinate within provided range
        Queue_Num = this.queue.pop()

        //this.Queue_Num = this.queue.pop()
        this.Banana = this.add.sprite(this.rnd.integerInRange(0, this.world.width), 0, 'Banana')
        this.Banana.inputEnabled = true;
        this.physics.enable(this.Banana, Phaser.Physics.ARCADE)

        // Set gravity and make sure banana is reset once it leaves world bounds or is killed
        this.Banana.body.gravity.y = 50
        this.Banana.checkWorldBounds = true;

        //Add text component to display numbers on falling bananas
        var text = this.add.text(20,30,String(Queue_Num),
            {font: "16px Arial",
            fontWeight: "bold",
            fill: "#FFFFFF",
            boundsAlignH:"right",
            boundsAlignV: "bottom"})
        this.Banana.addChild(text)

        console.log("Currently in if for "+ Queue_Num)
        this.Banana.events.onOutOfBounds.add(banana_out, this,0, Queue_Num + 1)
        console.log("Queue_Num + 1: " + (Queue_Num + 1))
        this.Banana.events.onKilled.add(banana_out,this,0, Queue_Num + 1)   //Code Line for testing collisio


        //----------------------------------------------PLAYER CONTROLS------------------------------------------
        //Map D key to move monkey to the right
        this.key_D = this.input.keyboard.addKey(Phaser.Keyboard.D)

        //Map A key to move monkey to the left
        this.key_A = this.input.keyboard.addKey(Phaser.Keyboard.A)

        //Map LEFT arrow key to move monkey to the left
        this.key_LEFT = this.input.keyboard.addKey(Phaser.Keyboard.LEFT)

        //Map RIGHT arrow key to move monkey to the right
        this.key_RIGHT = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

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

    
    update(delta) {

        this.Banana_Alive
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

        //Update function to update monkey's movement between frames
        //Left movement
        if (this.key_A.isDown) {
            this.UserMonkey.x -= 15
        }
        if (this.key_LEFT.isDown) {
            this.UserMonkey.x -= 15
        }
        //Right movement
        if (this.key_D.isDown) {
            this.UserMonkey.x += 15
        }
        if (this.key_RIGHT.isDown) {
            this.UserMonkey.x += 15
        }

        //Check collision with UserMonkey and Banana
        this.physics.arcade.collide(this.UserMonkey, this.Banana, collisionHandler, null, this);
    }
}

function getLevel(level){
    var array = []
    if(level == 1){
        console.log("level 1 was selected")
        array = [4,6,8,9,10,12]
    }
    else if(level == 2){
        console.log("level 2 was selected") 
        array = [14,15,16,18,20,21,22,24,25,26,27,28,30,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50,51,52,54,55,56,57,58,60,62,63,64]
    }
    else if(level == 3){
        console.log("level 3 was selected")
        array = [65,66,68,69,70,72,74,75,76,77,78,80,81,82,84,85,86,87,88,90,91,92,93,94,95,96,98,99,100,102,104,105,106,108,110,111,112,114]
    }   
    return array
}

//If objects collide, destroy second object
function collisionHandler(object1, object2){
    //this.Banana_Alive=false
    object2.kill()
}

//Function called on ARROW button to return to 'GameSelect' screen
function actionGoBack () {
    this.state.start('GameSelect')
}

//Function to reset banana position once it leaves world boundary
function banana_out(value){
    console.log(value)
    this.Banana.removeChildren()
    this.Banana.reset(this.rnd.integerInRange(0,game.width), 0)
    var text2 = this.add.text(20,30,String(value),
        {font: "16px Arial",
        fontWeight: "bold",
        fill: "#FFFFFF",
        boundsAlignH:"right",
        boundsAlignV: "bottom"})
    this.Banana.addChild(text2)
}

//Small function to determine if value is prime or not
function isPrime(value){
    for(var i = 2; i < value; i++){
        if(value % 1 === 0){
            return false
        }
    }
    return value >1
}