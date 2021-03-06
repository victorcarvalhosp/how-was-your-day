import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {isLoginLoading} from '../../auth/selectors/auth.selectors';
import {isActivitiesLoading, selectAllActivities} from '../selectors/activities.selectors';
import {IActivity} from '../models/activity';
import * as fromActivity from '../reducers/activities.reducer';
import {ActivitiesRequestedFromApi, ActivitiesRequestedWithCache, ActivityOpenModal} from '../actions/activities.actions';
import {ModalController} from '@ionic/angular';
import {CreateActivityComponent} from './create-activity/create-activity.component';

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
        this.store.dispatch(new ActivitiesRequestedWithCache());
        this.loading$ = this.store.pipe(select(isActivitiesLoading));
        this.list$ = this.store.pipe(select(selectAllActivities));
    }

    presentModal() {
        this.store.dispatch(new ActivityOpenModal({activity: {id: null, name: null, icon: null}}));
    }

    editActivity(activity: IActivity) {
        this.store.dispatch(new ActivityOpenModal({activity: activity}));
    }

    doRefresh(event) {
        console.log('Begin async operation');
        this.store.dispatch(new ActivitiesRequestedFromApi());

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

}
