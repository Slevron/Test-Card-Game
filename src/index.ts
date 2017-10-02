/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi';
import 'p2';
import * as Phaser from 'phaser';
import Config from './config';
import Game from './states/game';
import Options from './states/options';
import Menu from './states/menu';

class SimpleGame {
  game: Phaser.Game;
  logo: Phaser.Sprite;
  cursors: Phaser.CursorKeys;
  constructor() {
    this.game = new Phaser.Game(Config.width, Config.height, Phaser.AUTO, "content", this);
    this.game.state.add('Game', Game);
    this.game.state.add('Options', Options);
    this.game.state.add('Menu', Menu);
  }

  preload() { }

  create() {
    this.game.state.start('Menu');
  }

  update() {

  }
}

window.onload = () => {
  const game = new SimpleGame();
};
