import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {isMoodsLoading, selectAllMoods} from '../selectors/moods.selectors';
import {IMood} from '../models/mood';
import {MoodOpenModal, MoodsRequestedFromApi, MoodsRequestedWithCache} from '../actions/moods.actions';
import {IonReorderGroup} from '@ionic/angular';

@Component({
    selector: 'app-moods',
    templateUrl: './moods.component.html',
    styleUrls: ['./moods.component.scss']
})
export class MoodsComponent implements OnInit {



    loading$: Observable<boolean>;
    list$: Observable<IMood[]>;


    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new MoodsRequestedWithCache());
        this.loading$ = this.store.pipe(select(isMoodsLoading));
        this.list$ = this.store.pipe(select(selectAllMoods));
    }

    moveMood(e): void {
        console.log(e);
        e.detail.complete();
    }

    presentModal() {
        this.store.dispatch(new MoodOpenModal({mood: {id: null, name: null, icon: null}}));
    }

    editMood(mood: IMood) {
        this.store.dispatch(new MoodOpenModal({mood: mood}));
    }

    doRefresh(event) {
        this.store.dispatch(new MoodsRequestedFromApi());
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

}
