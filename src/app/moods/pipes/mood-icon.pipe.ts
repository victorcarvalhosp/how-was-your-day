import { Pipe, PipeTransform } from '@angular/core';
import {MoodIconEnum} from '../enums/mood-icon';

@Pipe({
  name: 'moodIcon'
})
export class MoodIconPipe implements PipeTransform {

  transform(value: MoodIconEnum): any {
    return MoodIconEnum.icon(value);
  }

}
