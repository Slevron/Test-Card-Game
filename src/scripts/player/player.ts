import CardModel from '../../models/card'
export default class Player {
  id: number;
  cards: CardModel[];
  x: number;

  constructor(card, id) {
    this.cards = [];
    this.id = id;
    this.x = 120 * this.id;
  }
}
