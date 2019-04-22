import {MoodIconEnum} from '../enums/mood-icon';

export interface IMood {
  id?: string;
  name: string;
  icon: MoodIconEnum;
  color: string;
  order?: number;
}
