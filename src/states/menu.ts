import MenuGeneral from '../scripts/menu/menuGeneral';

export default class Menu extends Phaser.State {
  create() {
    const options = {
      x: 0,
      y: -30,
    };
    new MenuGeneral(options, this.game);
  }
}
