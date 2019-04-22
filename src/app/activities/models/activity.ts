import {ActivityIconEnum} from '../enums/activity-icon';

export interface IActivity {
  id: string;
  name: string;
  icon: ActivityIconEnum;
}
