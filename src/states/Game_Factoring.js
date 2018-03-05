import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
    }

    preload() {
        this.load.image('Jungle', '../../assets/images/background_jungle.png')
        this.load.image('Monkey', '../../assets/images/Monkey_small.png')
        this.load.image('Banana', '../../assets/images/banana_small.png')
        this.load.image('Arrow', '../../assets/images/arrow.png')
    }


    create() {
        var Background = this.add.image(0, 0, 'Jungle')
        this.image = this.add.image(0, 230, 'Monkey')


        this.physics.startSystem(Phaser.Physics.ARCADE)

        this.add.button(this.world.centerX - 350, 30, 'Arrow', actionGoBack, this)

        for (var i = 0; i < 10; i++) {
            // Spawn Banana
            var Banana = this.add.sprite(this.rnd.integerInRange(0, 400), 0, 'Banana')

            Banana.inputEnabled = true;
            this.physics.enable(Banana, Phaser.Physics.ARCADE)
            // Set gravity
            Banana.body.gravity.y = 50
            Banana.checkWorldBounds = true;
            Banana.events.onOutOfBounds.add(banana_out, this)

            var text = this.add.text(0,0,"Some text", {font: "16px Arial", fill: "#ffffff"})
            Banana.addChild(text);
        }

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
    Banana.reset(Banana.x, 0)
  }

