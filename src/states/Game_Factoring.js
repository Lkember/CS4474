import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
    }

    preload() {
        this.load.image('Jungle', '../../assets/images/background_jungle.jpg')
        this.load.image('Monkey', '../../assets/images/Monkey.png')
        this.load.image('Banana', '../../assets/images/banana_small.png')
        this.load.image('Arrow', '../../assets/images/arrow_yellow.png')
    }


    create() {
        var Background = this.add.image(0, 0, 'Jungle')

        this.image = this.add.image(0, this.world.centerY +(this.world.centerY/3), 'Monkey')

        this.physics.startSystem(Phaser.Physics.ARCADE)

        this.add.button(this.world.centerX * 0.1, this.world.centerY * 0.1, 'Arrow', actionGoBack, this)

            // Spawn Banana
            var Banana = this.add.sprite(this.rnd.integerInRange(0, this.world.width), 0, 'Banana')

            Banana.inputEnabled = true;
            this.physics.enable(Banana, Phaser.Physics.ARCADE)
            // Set gravity
            Banana.body.gravity.y = 50
            Banana.checkWorldBounds = true;
            Banana.events.onOutOfBounds.add(banana_out, this)

            var text = this.add.text(20,30,"Number",
                {font: "16px Arial",
                    fontWeight: "bold",
                    fill: "#FFFFFF",
                    boundsAlignH:"right",
                    boundsAlignV: "bottom"})
            Banana.addChild(text);


        // Move monkey to right
        this.key_D = this.input.keyboard.addKey(Phaser.Keyboard.D)

        // Move monkey to Left
        this.key_A = this.input.keyboard.addKey(Phaser.Keyboard.A)
    }

    update(delta) {
        if (this.key_A.isDown) {
            this.image.x -= 15
        }

        if (this.key_D.isDown) {
            this.image.x += 15
        }
    }
}


  function actionGoBack () {
     this.state.start('GameSelect')
  }

  function banana_out(Banana){
    Banana.reset(this.rnd.integerInRange(0,game.width), 0)
  }

