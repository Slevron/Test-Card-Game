import Button from './button';

export default class ButtonState extends Button {
  state: string;

  constructor(options, game) {
    super(options, game);
    this.state = options.state;
    this.create();
  }

  event(item) {
    this.game.state.start(this.state);
  }
}
