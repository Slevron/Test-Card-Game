import MenuOptions from '../scripts/menu/menuOptions';
export default class Options extends Phaser.State {
  preload() { }

  create() {
    const options = {
      x: 0,
      y: 10,
    };
    new MenuOptions(options, this.game);
  }

  update() { }
}
