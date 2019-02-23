import {Component, OnInit} from '@angular/core';
import {from, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {isMoodsLoading, selectAllMoods} from '../selectors/moods.selectors';
import {IMood} from '../models/mood';
import {MoodOpenModal, MoodsRequestedFromApi, MoodsRequestedWithCache, MoodsSaveChangeOrderRequested} from '../actions/moods.actions';
import {take} from 'rxjs/operators';
import {fromArray} from 'rxjs/internal/observable/fromArray';

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
        let moods: IMood[] = [];

        this.list$.pipe(take(1)).subscribe((res: IMood[]) => {
            console.log(res);
            moods = res;
            const itemMove = moods.splice(e.detail.from, 1)[0];
            const moodsReordered = moods.splice(e.detail.to, 0, itemMove);
            this.store.dispatch(new MoodsSaveChangeOrderRequested({moods: moodsReordered}));
            // // @ts-ignore
            // this.list$ = from(moods);
            e.detail.complete();
        });
    }

    presentModal() {
        this.store.dispatch(new MoodOpenModal({mood: {id: null, name: null, icon: null, color: ''}}));
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
