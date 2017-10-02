import Button from './button';

export default class ButtonOptonsColors extends Button {
  nbColors: number;

  constructor(options, game) {
    super(options, game);
    this.nbColors = options.nbColors;
    this.create();
  }

  event(item) {
    localStorage.setItem("colors",this.nbColors.toString());
  }
}
