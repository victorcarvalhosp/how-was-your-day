import {IPeriod} from '../models/period';
import {Action} from '@ngrx/store';

export enum PeriodActionTypes {
    PERIOD_NEXT_MONTH_REQUESTED = '[Period] Next Month Requested',
    PERIOD_PREVIOUS_MONTH_REQUESTED = '[Period] Previous Month Requested',
    PERIOD_LOADED = '[Period] Period Loaded',
}

export class PeriodNextMonthRequested implements Action {
    readonly type = PeriodActionTypes.PERIOD_NEXT_MONTH_REQUESTED;
}


export class PeriodPreviousMonthRequested implements Action {
    readonly type = PeriodActionTypes.PERIOD_PREVIOUS_MONTH_REQUESTED;
}

export class PeriodLoaded implements Action {
    readonly type = PeriodActionTypes.PERIOD_LOADED;
    constructor(public payload: IPeriod) {
    }
}

export type PeriodActions =
    | PeriodNextMonthRequested
    | PeriodPreviousMonthRequested
    | PeriodLoaded;


