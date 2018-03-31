/**
 * @file: Game_Division.js
 * Purpose: Game instance for division game
 * Authors: Jieni Hou, Jason Lee, Jose Rivera
 * Language: ES6
 */
import Phaser from 'phaser'

var player;
var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var cancel_sound;
var numberSetToPopulate;
var dividendArray;
var div_1 = 0;
var div_2 = 0;
var userAnswer = 0;
var firstOp;
var secondOp;
var answerOp = [];
var board = [];
var levels;
var verified = false;
var attempted = false;
var counterDividend = 0;
var counterNumPopulate = 0;
var max = 0;
var lock = false;

export default class extends Phaser.State {
    init () {
    }

    //Load scene assets to display
    preload () {
        this.load.audio('cancel',['../../assets/fx/cancel1.wav'])
        this.load.image('Desert', '../../assets/images/cactus_fixed.png')
        this.load.image('Arrow', '../../assets/images/arrow_brown.png')
        this.load.image('Pause', '../../assets/images/pause_brown.png')
        this.load.image('menu', '../../assets/images/pause-b.png')
        this.load.image('bullet', '../../assets/images/bullet.png');
        this.load.image('bullseye', '../../assets/images/bullseye.png')
        this.load.image('cowboy', '../../assets/images/cowboy_monkey.png')
        this.load.spritesheet('kaboom', '../../assets/images/explode.png', 128, 128)
    }

    create () {
        cancel_sound = this.game.add.audio('cancel')
        //----------------------------------------------UI COMPONENT------------------------------------------
        //Display background in scene
        this.background = this.add.image(0, 0, 'Desert')

        //Creation of arrow button to exit state and return to game selection
        this.Back_Arrow = this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
        this.Back_Arrow.anchor.setTo(0.5, 0.5)

        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  Our bullet group
        bullets = this.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        //console.log("This is the bullet: " + bullets)

        //  The hero!
        player = this.add.sprite(this.world.centerX, this.world.height * 0.85, 'cowboy')
        player.anchor.setTo(0.5, 0.5)
        player.alive = true
        this.physics.enable(player, Phaser.Physics.ARCADE)
        //Collider to keep monkey in bounds
        player.body.collideWorldBounds = true
        //console.log("This is the player alive: " + player.alive)

          //  The baddies!
        aliens = this.add.group();
        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;

        //  An explosion pool
        explosions = this.add.group();
        explosions.createMultiple(30, 'kaboom')
        explosions.forEach(setupInvader, this)
        //console.log("This is the explosions: " + explosions)

        // Game done text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        //  And some controls to play the game with
        cursors = this.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //--------------------------------------------DIVISION GAME LOGIC-----------------------------------------
        //Set the default Arrays for the certain level
        numberSetToPopulate = levelSelect(this.game.global.divLevel)

        //Create a list of Dividend
        dividendArray = createDividend(numberSetToPopulate)
        levels = dividendArray.length

        console.log("This is dividend's length: " + levels)
        //console.log("This is numberSetToPopulate's length: " + numberSetToPopulate.length)
     
        //--------------------------------------------GAME NUMBERS DISPLAY---------------------------------------
        //Display equation onscreen
        //Array of 6 numbers to go on the board
        //Divisors are even numbers
         div_1 = dividendArray[counterDividend]
         div_2 = numberSetToPopulate[counterNumPopulate]

        // adding the targets
        createAliens();

        firstOp = this.add.text(this.world.centerX * 1.3,this.world.centerY * 0.8, div_1, {fontSize:"100px", fill:"#000000"});
        var mult_sign = this.add.text(this.world.centerX *1.4,this.world.centerY * 0.8, " \u00f7 ", {fontSize:"80px", fill:"#000000"});
        secondOp = this.add.text(this.world.centerX *1.5,this.world.centerY * 0.8, div_2, {fontSize:"100px", fill:"#000000"});
        var equals = this.add.text(this.world.centerX * 1.6,this.world.centerY * 0.8, " = ", {fontSize:"100px", fill:"#000000"});
        answerOp = this.add.text(this.world.centerX *1.75,this.world.centerY * 0.8, userAnswer, {fontSize:"100px", fill:"#000000"});

        firstOp.anchor.setTo(0.5,0.5)
        mult_sign.anchor.setTo(0.5,0.5)
        secondOp.anchor.setTo(0.5,0.5)
        equals.anchor.setTo(0.5,0.5)
        answerOp.anchor.setTo(0.5,0.5)

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
               // console.log("div_1: " + div_1)
                //console.log("div_2: " + div_2)
                if(userAnswer == 0){
                    answerOp.visible = false
                }
                else{
                    answerOp.visible = true
                }
                if(counterDividend < levels){
                    firstOp.setText(div_1)
                    secondOp.setText(div_2)

                    var answer = div_1 / div_2
                    //console.log("answer: " + answer)
                    answerOp.setText(userAnswer)
                }
                // check the number that is entered and make sure that it matches the answer
                if(userAnswer == answer && (attempted)){
                    console.log("The answer is CORRECT.")
                    // reset the answer portion
                    userAnswer = 0
                    // reset the check to see if the bullet has reached the option
                    attempted = false
                    counterDividend++
                    counterNumPopulate = counterNumPopulate + 2

                    // restart with the win restart
                    restart2(aliens)

                    // repopulate with new question
                    div_1 = dividendArray[counterDividend]
                    div_2 = numberSetToPopulate[counterNumPopulate]
                }
                else if(userAnswer != answer && (attempted)){
                    console.log("The answer is wrong.")
                    userAnswer = 0
                    attempted = false
                    restart2(aliens)
                }

                // game will be over when we finish all the dividends
                if(counterDividend == levels){
                    console.log("The game is over.")
                    // lock the game so the animations wont work anymore
                    lock = true;
                    stateText.visible = true;
                    counterDividend++
                     if(this.game.global.divLevel == 1){
                        console.log("This is the original divLevel: " + this.game.global.divLevel)
                        this.game.global.divLevel = 2
                        this.game.global.unlockDiv2 = true
                        console.log("This is the new divLevel: " + this.game.global.divLevel)
                        console.log("This is the new unlockDiv2: " + this.game.global.unlockDiv2)
                }
                else if(this.game.global.divLevel == 2){
                        this.game.global.divLevel = 3
                        this.game.global.unlockDiv3 = true
                }
                // restart the game
                restart()

                }

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
                if (player.alive)
                {
                //  Reset the player, then check for movement keys
                player.body.velocity.setTo(0, 0);

                if (cursors.left.isDown)
                {
                    player.body.velocity.x = -200;
                }
                else if (cursors.right.isDown)
                {
                    player.body.velocity.x = 200;
                }

                //  Firing?
                if (fireButton.isDown)
                {
                    fireBullet();
                }

                //  Run collision
                this.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                //game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
            }
    }

}

//Function called on ARROW button to return to 'GameSelect' screen
function actionGoBack () {
    cancel_sound.play()
    this.state.start('Div_dif')
}

function levelSelect(level){
    var array = []
    //var max = 0
    var counter = 1
    // level 1 = 6x6 max
    if(level == 1){
        console.log("level 1 was selected")
        max = 6
        for(var i = 0; i < 20; i++){
            if(counter > max){
                counter = 1
            }
            array[i] = counter
            //console.log("This is the value of the array element: " + i + "This is the value: " + array[i])
            counter++
        }
    }
    // level 2 = 8x8 max
    else if(level == 2){
        console.log("level 2 was selected")
        max = 8
        for(var i = 0; i < 20; i++){
            if(counter > max){
                counter = 1
            }
            array[i] = counter
            //console.log("This is the value of the array2 element: " + i + "This is the value: " + array[i])
            counter++
        }

    }
    // level 3 = 12x12 max
    else{
        console.log("level 3 was selected")
        max = 12
        for(var i = 0; i < 20; i++){
            if(counter > max){
                counter = 1
            }
            array[i] = counter
            //console.log("This is the value of the array3 element: " + i + "This is the value: " + array[i])
            counter++
        }
    }
    return shuffle(array)
}

// takes out duplicates from an array
function removeDuplicates(min){
    var unique_array = []
    var counting = 0
    var number = 0

    for(var i = min;i < numberSetToPopulate.length; i++){
        if(unique_array.indexOf(numberSetToPopulate[i]) == -1){
            unique_array.push(numberSetToPopulate[i])
        } 
    }
    
    counting = unique_array.length
    // add additional if the length of the array is less than 5
    while(counting < 5){
        number = Math.floor((Math.random() * max) + 1);
        if(unique_array.indexOf(number) == -1){
            unique_array.push(number)
            counting ++
        } 
    }

    return unique_array
}

// shuffle array to give randomness
function shuffle(array) {
    var counter = 5;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function createDividend(array){
    var result = []
    var counter = 0
    for(var i = 0; i < array.length-1; i=i+2){
        result[counter] = array[i] * array[i+1]
        counter++
    }
    return result;
}

function createAliens () {
    var initial = 0
    var temp = removeDuplicates(initial)

    for (var y = 0; y <= 0; y++)
    {
        for (var x = 0; x < 5; x++)
        {
            var alien = aliens.create(x * 140, y * 100, 'bullseye')
            alien.scale.setTo(0.6, 0.6)
            alien.anchor.setTo(0.1, 0.1)
            alien.value = temp[initial]
            var text = game.add.text(35, 40, temp[initial], {fontSize:"30px", fill: '#000000' });
            alien.addChild(text)
            initial++
        }
    }

    aliens.x = 130;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
}

function createAliens2 () {
    // min is the minimum value we have to include to populate the board
    var min = 0

    if (counterNumPopulate != 0){
       min = counterNumPopulate - 1
    }

    var unique_array = removeDuplicates(min)
    shuffle(unique_array)

    var i = 0

    for (var y = 0; y <= 0; y++)
    {
        for (var x = 0; x < 5; x++)
        {   
            var alien = aliens.create(x * 140, y * 100, 'bullseye')
            alien.scale.setTo(0.6, 0.6)
            alien.anchor.setTo(0.1, 0.1)
            //console.log("This is the min: " + min + " the unique_array value is: " + unique_array[i])
            alien.value = unique_array[i]
            var text = game.add.text(35, 40, unique_array[i], {fontSize:"30px", fill: '#000000' });
            alien.addChild(text)
            i++
        }
    }

    aliens.x = 130;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
}

function setupInvader (bullseye) {

    bullseye.anchor.x = 0.5;
    bullseye.anchor.y = 0.5;
    bullseye.animations.add('kaboom');

}

function fireBullet () {
    if(lock == false){
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        var bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }
    }
}

function collisionHandler (bullet, alien){
    if(lock == false){
    //  When a bullet hits an alien we kill them both
    userAnswer = alien.value
    var temp = alien
    // remove the bullet
    bullet.kill();
    alien.visible = false
    attempted = true

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);
    }
}

function resetBullet (bullet) {
    //  Called if the bullet goes out of the screen
    bullet.kill();
}

function restart2 (aliens) {

    //  A new level starts
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    createAliens2();
    console.log("restarted2")

}

function restartGame(){
    stateText.visible = false;
    lock = false;
    firstOp.visible = true
    secondOp.visible = true
    // restart everything
    aliens.removeAll();
    createAliens();
    numberSetToPopulate = levelSelect(this.game.global.divLevel)
        //Create a list of Dividend
        dividendArray = createDividend(numberSetToPopulate)
        levels = dividendArray.length

        console.log("This is dividend's length: " + levels)
        div_1 = dividendArray[counterDividend]
        div_2 = numberSetToPopulate[counterNumPopulate]

    console.log("restarted")
  }

function restart () {
    //  A new level starts
    //  And brings the aliens back from the dead :)
    stateText.text = " You Won, \n Click to restart";
    firstOp.visible = false
    secondOp.visible = false
    stateText.visible = true;
    div_1 = 0;
    div_2 = 0;
    userAnswer = 0;
    verified = false;
    attempted = false;
    counterDividend = 0;
    counterNumPopulate = 0;
    max = 0;
    game.input.onTap.addOnce(restartGame,self);
}