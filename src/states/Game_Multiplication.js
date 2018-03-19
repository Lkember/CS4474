/**
 * @file: Game_Multiplication.js
 * Purpose: Game instance for multiplication game
 * Authors: Jieni Hou, Jason Lee, Jose Rivera
 * Language: ES6
 */
import Phaser from 'phaser'

var mult_1 = 0;
var mult_2 = 0;
var answer = 0;
var firstOp;
var secondOp;
var answerOp;
var text;

export default class extends Phaser.State {
    init () {
    }

    //Load scene assets to display
    preload () {
        this.load.image('Ice', '../../assets/images/background_ice.jpg')
        this.load.image('Arrow', '../../assets/images/arrow_blue.png')
        this.load.image('menu', '../../assets/images/pause-b.png')
        this.load.image('Pause', '../../assets/images/pause_blue.png')
        this.load.image("IceBlock", "../../assets/images/Snow-Block-100.png")
        this.load.image('IceBlockBroken', '../../assets/images/Snow-Block-num-100.png')
        this.load.image("Monkey", "../../assets/images/user-monkey-big-snow.png")
    }


    create () {
        //----------------------------------------------UI COMPONENT---------------------------------------------
        //Display background in scene
        this.background = this.add.image(0, 0, 'Ice')

        //Adding the monkey onto the background
        this.monkey = this.add.sprite(this.world.centerX * 1.5, 560, 'Monkey')
        this.monkey.scale.setTo(0.5,0.5)

        //Creation of arrow button to exit state and return to game selection
        this.Back_Arrow = this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)
        this.Back_Arrow.anchor.setTo(0.5, 0.5)

        //----------------------------------------------ICE BLOCKS COMPONENT---------------------------------------------
        //Need to add a check to see what level was selected
        //Adding the iceblocks onto the game
        this.group  = this.add.group()

        this.group.createMultiple(20,"IceBlock",[0],true)

        this.group.align(5, -1, 150, 150)

        this.group.x = 100
        this.group.y = 200

        //----------------------------------------------LOGIC COMPONENT---------------------------------------------
        //Set the default Arrays for the certain level
        var numberSetToPopulate = levelSelect(this.game.global.level)
        this.currentPair = false
        
        //Because the above array is already randomized, you can pick the first 20 elements to be displayed
        // loop through to fill the children ice blocks with text
        for(var i = 0; i < 20; i++){
            text = this.add.text(35, 40, numberSetToPopulate[i], {fontSize:"30px", fill: '#000000' });
            text.visible = true
            this.group.children[i].addChild(text)
            this.group.children[i].value = numberSetToPopulate[i]
            console.log("Group member value: " + this.group.children[i].value)
            this.group.children[i].inputEnabled = true
            var temp = this.group.children[i].value
            
            //this.group.children[i].useHandCursor = true
            this.group.children[i].events.onInputDown.add(listener, this);
            this.group.children[i].events.onInputDown.add((function() { multSet(temp)}),this)
            console.log(mult_1)
            console.log(mult_2)
        }

        for(var i=0; i<20; i++){
            console.log("Value for child " + i +" : " + this.group.children[i].value)
        }


        //Display equation onscreen **{Is Updated under update()}**
        firstOp = this.add.text(this.world.centerX * 1.3,this.world.centerY * 0.8, mult_1, {fontSize:"100px", fill:"#000000"});
        this.add.text(this.world.centerX *1.4,this.world.centerY * 0.8, "X", {fontSize:"100px", fill:"#000000"});
        secondOp = this.add.text(this.world.centerX *1.5,this.world.centerY * 0.8, mult_2, {fontSize:"100px", fill:"#000000"});
        this.add.text(this.world.centerX * 1.6,this.world.centerY * 0.8, "=", {fontSize:"100px", fill:"#000000"});
        answerOp = this.add.text(this.world.centerX *1.7,this.world.centerY * 0.8, answer, {fontSize:"100px", fill:"#000000"});
        

        


        // remember to hide the sprite once its selected + if the answer given was correct
        
        //image.events.onInputDown.add(listener, this);

        //Check if the selected ice blocks multiply to be the right value
        var counter = 0
        // 1. if selected, populate the right side section
        // 2. once counter is two, calculate the product, then compare with user input


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

        if(mult_1==0 && mult_2==0){
            firstOp.visible = false
            secondOp.visible = false
            answerOp.visible = false
        }
        else{
            firstOp.visible = true
            secondOp.visible = true
            answerOp.visible = true
        }
        //Updates product view with newest variables
        firstOp.setText(mult_1)
        secondOp.setText(mult_2)

        answer = mult_1 * mult_2
        answerOp.setText(answer)

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
    mult_1 = 0
    mult_2 = 0
}

//Setting variable from current sprite clicked
function multSet(value){
    //this.currentPair = true
    if(mult_1 == 0){
        mult_1 = value
    }
    else mult_2 = value
 
    console.log("Mult1 = " + mult_1)
    console.log("Mult2 = " + mult_2)
}

function listener (sprite) {
    console.log("The image is clicked!")
    //
    //   NEED TO LIMIT THE AMOUNT OF TIMES THEY CAN CLICK TO 2
    // 
    sprite.loadTexture('IceBlockBroken',0,false)

    // get the value of the sprite that is clicked on: console.log(sprite.value)
    //sprite.text.visible = true
}



function levelSelect(level){
    var array = []
    var max = 0
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
// shuffle array to give randomness
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
