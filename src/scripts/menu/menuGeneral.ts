import ButtonState from '../button/buttonState';

export default class MenuGeneral {
  game: any;
  x: number;
  y: number;

  constructor(options, game) {
    this.game = game;
    this.x = options.x;
    this.y = options.y;
    this.create();
  }

  create() {
    const group = this.game.add.graphics(this.x, this.y);
    const options = {
      color: '#ff0044',
      title: 'Play',
      size: '65px Helvetica',
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      state: 'Game',
      group: group,
    }
    new ButtonState(options, this.game);
    options.title = 'Options';
    options.state = 'Options';
    options.y = this.game.world.centerY + 65;
    new ButtonState(options, this.game);
  }
}
