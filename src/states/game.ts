import Deck from '../scripts/deck/deck';
import Card from '../scripts/card/card';
import TypeModel from '../models/type';
import Player from '../scripts/player/player';
import Shapes from '../data/data';
import Button from '../scripts/button/button';

import * as _ from "lodash"

export default class Game extends Phaser.State {
  numbers: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  types: TypeModel[] = [];
  players: number;
  playersTransform: any[];
  deck: any;
  totalCard: number;
  dropDeck: any[] = [];
  playerKey: number = 0;
  updateCard: boolean = false;

  preload() { }

  create() {
    this.players = 5; //0TODO - Changer variable pour distribuer pour 4 joueurs par exemple
    this.types = Shapes;
    this.generateDeck();
    this.playersTransform = [];
    for(let i = 0 ; i < this.players ; i++) {
      this.playersTransform.push(new Player(null, i));
    }

    const group = this.game.add.graphics(80, 40);
    const options = {
      color: '#ff0044',
      title: 'Distribute',
      size: '20px Helvetica',
      x: 20,
      y: 0,
      group: group,
    }

    const button = new Button(options, this.game);
    const buttonTransform = button.create();
    buttonTransform.events.onInputDown.add(this.distributeCards, this);

    this.initBtn(options, 'Drop Card', 50, this.dropOneCard);
    this.initBtn(options, 'Take Card', 100, this.takeCard);
    this.initBtn(options, 'Mix drop deck', 150, this.mixDropDeck);
  }

  update() { }

  private initBtn(options, title, y, click){
    options.title = title;
    options.y = y;
    const button = new Button(options, this.game);
    const buttonTransform = button.create();
    buttonTransform.events.onInputDown.add(click, this);
  }
  private distributeCards() {
    if(this.deck.cards.length % this.playersTransform.length === 0) {
      for(let i = 0 ; i <= this.playersTransform.length * (this.deck.cards.length / this.playersTransform.length) ; i++) {
        for (let j = 0; j < this.deck.cards.length; j++) {
          if(i === j) {
            this.playersTransform[this.returnKey()].cards.push(this.deck.cards[j]);
          }
        }
      }
      this.updateCard = true;
      this.deck.cards = [];
      console.log('Players with hand - ', this.playersTransform);
    }
  }

  private dropOneCard() {
    if (this.dropDeck.length < this.totalCard && this.updateCard) {
      const id = _.random(0, this.playersTransform.length - 1);
      const idCard = _.random(0, this.playersTransform[id].cards.length - 1);
      const card = this.playersTransform[id].cards[idCard];
      console.log('Player '+id+' before - ', this.playersTransform[id].cards.length);
      console.log('Player '+id+' remove - ', card);
      if (card) {
        this.dropDeck.push(card);
        this.playersTransform[id].cards.splice(idCard, 1);
      } else {
        this.dropOneCard();
      }
      console.log('Player '+id+' after - ', this.playersTransform[id].cards.length);
    } else {
      console.log('Players do not have cards');
    }
  }

  private takeCard() {
    if (this.deck.cards.length > 0) {
      console.log('Before the turn -', this.playersTransform[0].cards.length)
      this.playersTransform[0].cards.push(this.deck.cards[0]);
      this.deck.cards.splice(0,1);
      console.log('You take one card', this.deck.cards[0])
      console.log('After the turn -', this.playersTransform[0].cards.length)
    } else {
      console.log('No card in the deck');
    }
  }

  private mixDropDeck() {
    if (this.dropDeck.length === this.totalCard && this.updateCard ) {
      this.deck.cards = _.shuffle(this.dropDeck);
      this.dropDeck = [];
      console.log('Deck was update with the drop deck - ', this.deck.cards);
    } else {
      console.log('No Drop deck');
    }
  }

  private generateDeck() {
    const transformNumbers = _.slice(this.numbers, 0, _.toInteger(localStorage.getItem("nbCards")));
    const transformTypes =  _.toInteger(localStorage.getItem("colors")) === 1 ? _.remove(this.types, function(type) {
      return type.color === "#000000";
    }) : this.types;
    this.totalCard = transformNumbers.length * transformTypes.length;
    const options = {
      x: 0,
      y: 0,
      width: 100,
      height: 140,
      numbers: transformNumbers,
      types: transformTypes,
    }
    this.deck = new Deck(options, this.game);
    this.deck.cards = _.shuffle(this.deck.cards);
  }

  private returnKey() {
    if(this.playerKey === this.playersTransform.length - 1) {
      this.playerKey = 0;
    } else {
      this.playerKey++;
    }
    return this.playerKey < this.players ? this.playerKey : this.playerKey - this.players ;
  }
}
