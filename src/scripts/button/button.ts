export default class Button{
  game: any;
  color: string;
  title: string;
  size: string;
  x: number;
  y: number;
  group: any;

  constructor(options, game) {
    this.game = game;
    this.color = options.color;
    this.title = options.title.toUpperCase();
    this.size = options.size;
    this.x = options.x;
    this.y = options.y;
    this.group = options.group;
  }

  create() {
    const text = this.game.add.text(
      this.x,
      this.y,
      this.title,
      {
        font: this.size,
        fill: this.color,
        align: "center"
      },
    );
    text.anchor.setTo(0.5, 0.5);
    text.inputEnabled = true;
    text.input.useHandCursor = true;
    text.input.enableDrag();
    text.events.onInputOver.add(this.hover, this);
    text.events.onInputOut.add(this.out, this);
    text.events.onInputDown.add(this.event, this);
    if(this.group) {
      this.group.addChild(text);
    }

    return text;
  }

  event(item) {
    return item;
  }

  hover(item) {
    item.fill = "#ffff44";
  }

  out(item) {
    item.fill = this.color;
  }
}
