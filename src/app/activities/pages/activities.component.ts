import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {isLoginLoading} from '../../auth/selectors/auth.selectors';
import {isActivitiesLoading, selectAllActivities} from '../selectors/activities.selectors';
import {IActivity} from '../models/activity';
import * as fromActivity from '../reducers/activities.reducer';
import {ActivitiesRequested} from '../actions/activities.actions';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {


    loading$: Observable<boolean>;
    list$: Observable<IActivity[]>;


    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new ActivitiesRequested());
        this.loading$ = this.store.pipe(select(isActivitiesLoading));
        this.list$ = this.store.pipe(select(selectAllActivities));
    }

}
