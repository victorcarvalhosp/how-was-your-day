import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {PeriodService} from '../services/period.service';
import {PeriodActionTypes, PeriodLoaded, PeriodNextMonthRequested, PeriodPreviousMonthRequested} from '../actions/period.actions';
import {IPeriod} from '../models/period';
import {selectPeriod} from '../selectors/period.selectors';


@Injectable()
export class PeriodEffects {


    constructor(private actions$: Actions, private store: Store<AppState>, private periodService: PeriodService) {
    }

    @Effect()
    previousPeriodMonthRequested$: Observable<Action> = this.actions$
        .pipe(
            ofType<PeriodPreviousMonthRequested>(PeriodActionTypes.PERIOD_PREVIOUS_MONTH_REQUESTED),
            withLatestFrom(this.store.pipe(select(selectPeriod))),
            map(([action, period]) => period),
            switchMap(period => {
                console.log(period);
                const newPeriod: IPeriod = this.periodService.changeMonth(period, -1);
                return of(new PeriodLoaded(newPeriod));
            }),
        );

    @Effect()
    nextPeriodMonthRequested$: Observable<Action> = this.actions$
        .pipe(
            ofType<PeriodNextMonthRequested>(PeriodActionTypes.PERIOD_NEXT_MONTH_REQUESTED),
            withLatestFrom(this.store.pipe(select(selectPeriod))),
            map(([action, period]) => period),
            switchMap(period => {
                console.log(period);
                const newPeriod: IPeriod = this.periodService.changeMonth(period, 1);
                return of(new PeriodLoaded(newPeriod));
            }),
        );
}
