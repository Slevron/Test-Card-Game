import MenuOptions from '../menu/menuOptions';

export default class ButtonArrow {
  game: any;
  x: number;
  y: number;
  angle: number;
  color: number;
  direction: string;
  group: any;

  constructor(options, game) {
    this.game = game;
    this.x = options.x;
    this.y = options.y;
    this.angle = options.angle;
    this.color = options.color;
    this.direction = options.direction;
  }

  create() {
    this.group = this.game.add.graphics(this.x, this.y);
    const graphics = this.createArrow();
    this.group.addChild(graphics);
    this.group.angle = this.angle;
    this.group.anchor.setTo(0.5, 0.5);
    this.group.scale.set(0.5,0.5)

    return this.group;
  }

  event() {
    MenuOptions.updateNbCards(this.direction);
  }

  private createArrow() {
    const graphics = this.game.add.graphics(0, 0);
    graphics.clear()
    graphics.beginFill(this.color);
    graphics.moveTo(0, 0);
    graphics.lineTo(150, 0);
    graphics.lineTo(0, 150);
    graphics.endFill();

    graphics.inputEnabled = true;
    graphics.input.useHandCursor = true;
    graphics.events.onInputOver.add(this.hover, this);
    graphics.events.onInputOut.add(this.out, this);
    graphics.events.onInputDown.add(this.event, this);

    return graphics;
  }

  private hover(item) {
    this.color = 0xffff44;
    this.group.addChild(this.createArrow());
  }

  private out(item) {
    this.color = 0xff0044;
    this.group.addChild(this.createArrow());
  }
}
