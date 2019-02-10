import { Pipe, PipeTransform } from '@angular/core';
import {ActivityIconEnum} from '../enums/activity-icon';

@Pipe({
  name: 'activityIcon'
})
export class ActivityIconPipe implements PipeTransform {

  transform(value: ActivityIconEnum): any {
    return ActivityIconEnum.icon(value);
  }

}
