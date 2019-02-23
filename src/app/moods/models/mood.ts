import {MoodIconEnum} from '../enums/mood-icon';

export class IMood {
  id: string;
  name: string;
  icon: MoodIconEnum;
  color: string;
  order?: number;
}
