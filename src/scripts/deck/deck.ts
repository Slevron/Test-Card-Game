import Card from "../card/card";
import CardModel from "../../models/card";

export default class Deck {
  game: any;
  x: number;
  y: number;
  width: number;
  height: number;
  numbers: number[];
	types: any[];
  cards: CardModel[];

  constructor(options, game) {
    this.game = game;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.numbers = options.numbers;
    this.types = options.types;
    this.cards = [];
    this.create(game);
  }

  create(game) {
    const graphics = this.game.add.graphics(10, this.game.height - (this.height + 10));
    this.types.forEach(type => {
      this.numbers.forEach(number => {
        const card = this.initCard(type, number, game);
        graphics.addChild(card.create())
        this.cards.push(card);
      });
    });
  }

  private initCard(type, number, game) {
    const options = {
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
      type: type.shape,
      number: number,
      color: type.color,
    };
    const card = new Card(options, game);

    return card
  }
}
