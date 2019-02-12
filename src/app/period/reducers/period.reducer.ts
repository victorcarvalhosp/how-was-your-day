import {IPeriod} from '../models/period';
import {LastDayOfMonthPipe, StartOfMonthPipe} from 'ngx-date-fns';
import {PeriodActions, PeriodActionTypes} from '../actions/period.actions';


export interface PeriodState {
    period: IPeriod;
}


export const initialPeriodState: PeriodState = {
    period: {
        endDate: new LastDayOfMonthPipe().transform(new Date()),
        startDate: new StartOfMonthPipe().transform(new Date())
    }
};

export function periodReducer(state = initialPeriodState, action: PeriodActions): PeriodState {
    switch (action.type) {
        case PeriodActionTypes.PERIOD_LOADED:
            return {
                ...state,
                period: action.payload
            };
        default:
            return state;
    }
}
