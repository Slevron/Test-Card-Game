export default class Card {
  game: any;
  color: number;
  type: string;
  number: number;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(options, game) {
    this.game = game;
    this.color = options.color;
    this.type = options.type;
    this.number = options.number;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
  }

  create() {
    const graphics = this.game.add.graphics(0, 0);
    graphics.clear();
    graphics.beginFill(0xffffff);
    graphics.drawRect(this.x, this.y, this.width, this.height);
    graphics.endFill();
    graphics.addChild(this.generateTitleSelect(this.type, 20, 15, 15));
    graphics.addChild(this.generateTitleSelect(this.number, this.width / 2, this.height / 2, 80));

    return graphics;
  }

  private generateTitleSelect(title, x, y, size) {
    const text = this.game.add.text(
      x,
      y,
      title,
      {
        font: `${size}px Helvetica`,
        fill: this.color,
        align: 'center'
      },
    );
    text.anchor.setTo(0.5, 0.5);

    return text;
  }
}
