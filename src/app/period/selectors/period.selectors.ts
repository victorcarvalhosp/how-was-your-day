import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PeriodState} from '../reducers/period.reducer';


export const selectPeriodState = createFeatureSelector<PeriodState>('period');

export const selectPeriod = createSelector(
    selectPeriodState,
    periodState => periodState.period
);




