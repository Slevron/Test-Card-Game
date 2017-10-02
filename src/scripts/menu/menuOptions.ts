import MenuGeneral from './menuGeneral';
import ButtonOptionsColors from '../button/buttonOptionsColors';
import ButtonArrow from '../button/buttonArrow';

export default class MenuOptions extends MenuGeneral {
  static nbCards: number = 0;
  static textNbCards: any;
  static updateNbCards(direction: string) {
    if(direction === 'right' && this.nbCards < 13) {
      this.nbCards++;
    } else if (direction === 'left' && this.nbCards > 0) {
      this.nbCards--
    }
    MenuOptions.textNbCards.text = this.nbCards;
    localStorage.setItem("nbCards", this.nbCards.toString());
  }

  create() {
    this.initColors();
    this.initNbCards();
  }

  private initColors() {
    const group = this.game.add.graphics(this.game.world.centerX, 40);
    const text = this.generateTitleSelect('Select number of colors');
    group.addChild(text);
    const options = {
      color: '#ff0044',
      title: '1 Color',
      size: '40px Helvetica',
      x: -text.width + 150,
      y: 50,
      nbColors: 1,
      group: group,
    }
    const button = new ButtonOptionsColors(options, this.game);
    options.title = '2 Colors';
    options.nbColors = 2;
    options.x = text.width - 150;
    new ButtonOptionsColors(options, this.game);
  }

  private initNbCards() {
    const group = this.game.add.graphics(this.game.world.centerX, 150);
    const text = this.generateTitleSelect('Select number of card by type')
    group.addChild(text);
    const textNumber = MenuOptions.textNbCards = this.generateTitleSelect(MenuOptions.nbCards.toString());
    textNumber.y = 90;
    group.addChild(textNumber);
    const options = {
      x: text.width - 150,
      y: 90,
      angle: 135,
      color: 0xff0044,
      direction: 'right',
    }
    this.generateArrow(group, options);
    options.x = -text.width + 150;
    options.direction = 'left';
    options.angle = -45;
    this.generateArrow(group, options);
  }

  private generateArrow(group, options) {
    const arrow = new ButtonArrow(options, this.game);
    group.addChild(arrow.create());
  }

  private generateTitleSelect(title) {
    const text = this.game.add.text(
      0,
      0,
      title,
      {
        font: '40px Helevetica',
        fill: '#ff0044',
        align: 'center'
      },
    );
    text.anchor.setTo(0.5, 0.5);

    return text;
  }
}
