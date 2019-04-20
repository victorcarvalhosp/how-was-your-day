import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {EntriesRequested, EntryOpenModal} from '../actions/entries.actions';
import {isEntriesLoading, selectAllEntries} from '../selectors/entries.selectors';
import {IEntry} from '../models/entry';
import { firestore } from 'firebase';
import {ActivitiesRequestedFromApi} from '../../activities/actions/activities.actions';

@Component({
    selector: 'app-entries',
    templateUrl: 'entries.page.html',
    styleUrls: ['entries.page.scss']
})
export class EntriesPage implements OnInit {

    loading$: Observable<boolean>;
    list$: Observable<IEntry[]>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new EntriesRequested());
        this.loading$ = this.store.pipe(select(isEntriesLoading));
        this.list$ = this.store.pipe(select(selectAllEntries));
    }

    presentModal() {
        this.store.dispatch(new EntryOpenModal({entry: {id: null, name: null, date: firestore.Timestamp.now()}}));
    }

    editEntry(entry: IEntry) {
        this.store.dispatch(new EntryOpenModal({entry: entry}));
    }

    doRefresh(event) {
        this.store.dispatch(new EntriesRequested());
        event.target.complete();
    }

}
