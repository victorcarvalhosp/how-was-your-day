import {Component, OnInit} from '@angular/core';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {PeriodNextMonthRequested, PeriodPreviousMonthRequested} from '../actions/period.actions';
import {Observable} from 'rxjs';
import {IPeriod} from '../models/period';
import {selectPeriod} from '../selectors/period.selectors';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {


  period$: Observable<IPeriod>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.period$ = this.store.pipe(select(selectPeriod));
  }

  handleNextMonth() {
    this.store.dispatch(new PeriodNextMonthRequested());
  }

  handlePreviousMonth() {
    this.store.dispatch(new PeriodPreviousMonthRequested());
  }

}
