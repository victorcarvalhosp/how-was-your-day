import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {EntriesRequestedFromApi, EntriesRequestedWithCache} from '../actions/entries.actions';
import {isEntriesLoading, selectAllEntries} from '../selectors/entries.selectors';
import {IEntry} from '../models/entry';

@Component({
  selector: 'app-entries',
  templateUrl: 'entries.page.html',
  styleUrls: ['entries.page.scss']
})
export class EntriesPage implements OnInit{

  loading$: Observable<boolean>;
  list$: Observable<IEntry[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new EntriesRequestedWithCache());
    this.loading$ = this.store.pipe(select(isEntriesLoading));
    this.list$ = this.store.pipe(select(selectAllEntries));
  }

  presentModal() {
    // this.store.dispatch(new ActivityOpenModal({activity: {id: null, name: null, icon: null}}));
  }

  editEntry(entry: IEntry) {
    // this.store.dispatch(new ActivityOpenModal({activity: entry}));
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.store.dispatch(new EntriesRequestedFromApi());

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
