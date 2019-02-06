import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';


@Injectable()
export class ActivitiesEffects {



  constructor(private actions$: Actions, private store: Store<AppState>) {}

  // @Effect()
  // loadAllCourses$ = this.actions$
  //     .pipe(
  //         ofType<ActivitiesRequested>(ActivitiesActionTypes.ActivitiesRequested),
  //         withLatestFrom(this.store.pipe(select(activitiesLoaded))),
  //         filter(([action, activitiesLoaded]) => !activitiesLoaded),
  //         mergeMap(() => this.coursesService.findAllCourses()),
  //         map(activities => new ActivitiesLoaded({activities}))
  //     );

}
