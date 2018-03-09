import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import GameSelectState from './states/GameSelect'
import GameStateFact from './states/Game_Factoring'
import GameStateMult from './states/Game_Multiplication'
import GameStateDiv from './states/Game_Division'
import MainMenuState from './states/MainMenu'
import MusicState from './states/MusicSettings'
import FactDifState from './states/Fact_Difficulty'
import MultDifState from './states/Mult_Difficulty'
import DivDifState from './states/Div_Difficulty'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Game_Factoring', GameStateFact, false)
    this.state.add('Game_Multiplication', GameStateMult, false)
    this.state.add('Game_Division', GameStateDiv, false)
    this.state.add('MainMenu', MainMenuState, false)
    this.state.add('GameSelect', GameSelectState, false)
    this.state.add('MusicSettings', MusicState, false)
    this.state.add('Fact_dif',FactDifState, false)
    this.state.add('Mult_dif', MultDifState, false)
    this.state.add('Div_dif',DivDifState, false)




    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }
}

window.game = new Game()

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
