import {IActivity} from '../../activities/models/activity';
import {IMood} from '../../moods/models/mood';

export class IEntry {
  id: string;
  name: string;
  activities: IActivity[];
  mood: IMood;
  date: Date;
  notes: string;
}
