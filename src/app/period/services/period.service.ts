import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {AddMonthsPipe, LastDayOfMonthPipe, StartOfMonthPipe} from 'ngx-date-fns';
import {IPeriod} from '../models/period';

@Injectable({
    providedIn: 'root'
})
export class PeriodService {

    constructor(private store: Store<AppState>) {

    }

    public changeMonth(period: IPeriod, months: number): IPeriod {
        const newStartDate: Date = new AddMonthsPipe().transform(period.startDate, months);
        return this.setStartAndEndDates(newStartDate);
    }

    private setStartAndEndDates(date: Date): IPeriod {
        const newEndDate: Date = new LastDayOfMonthPipe().transform(date);
        const newStartDate: Date = new StartOfMonthPipe().transform(date);
        return {startDate: newStartDate, endDate: newEndDate};
    }
}
