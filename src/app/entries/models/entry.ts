import {IActivity} from '../../activities/models/activity';
import {IMood} from '../../moods/models/mood';
import { firestore } from 'firebase';


export class IEntry {
  id: string;
  name: string;
  activities?: IActivity[];
  mood?: IMood;
  date: firestore.Timestamp;
  notes?: string;
}
