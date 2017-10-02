import TypeModel from '../models/type';

let Shapes:TypeModel[];
const firstCardColor: string = "#000000";
const secondCardColor: string = "#fd0000";
export default Shapes = [
  {
    shape: 'Trefle',
    color: firstCardColor,
  },
  {
    shape: 'Pique',
    color: firstCardColor,
  },
  {
    shape: 'Coeur',
    color: secondCardColor,
  },
  {
    shape: 'Carreaux',
    color: secondCardColor,
  },
]
