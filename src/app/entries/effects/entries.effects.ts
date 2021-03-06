import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {
    EntriesActionTypes,
    EntriesLoaded,
    EntriesRequested,
    EntriesRequestFailed,
    EntriesStopLoading,
    EntryCloseModal,
    EntryOpenModal,
    EntrySaveFailed,
    EntrySaveRequested,
    EntrySaveSucess
} from '../actions/entries.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EntriesService} from '../services/entries.service';
import {Observable, of} from 'rxjs';
import {ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PeriodActionTypes, PeriodLoaded} from '../../period/actions/period.actions';
import {selectPeriod} from '../../period/selectors/period.selectors';
import {CreateEntryComponent} from '../pages/create-entry/create-entry.component';
import {MoodCloseModal, MoodsActionTypes, MoodSaveSucess} from '../../moods/actions/moods.actions';


@Injectable()
export class EntriesEffects {


    constructor(private actions$: Actions, private store: Store<AppState>, private entriesService: EntriesService,
                private modalController: ModalController, private router: Router, public toastController: ToastController) {
    }

    @Effect()
    previousPeriodMonthRequested$: Observable<Action> = this.actions$
        .pipe(
            ofType<PeriodLoaded>(PeriodActionTypes.PERIOD_LOADED),
            map(action => {
                return new EntriesRequested();
            }),
        );



    @Effect()
    loadAllEntriesFromApi$: Observable<Action> = this.actions$
        .pipe(
            ofType<EntriesRequested>(EntriesActionTypes.ENTRIES_REQUESTED),
            withLatestFrom(this.store.pipe(select(selectPeriod))),
            map(([action, period]) => period),
            switchMap((period) => {
                return this.entriesService.findByPeriod(period).pipe(
                    map(entries => {
                        return new EntriesLoaded({entries});
                    }),
                    catchError(err => {
                        return of(new EntriesRequestFailed(err.message));
                    })
                );
            })
        );


    @Effect({dispatch: false})
    openEntryModal$ = this.actions$
        .pipe(
            ofType<EntryOpenModal>(EntriesActionTypes.ENTRY_OPEN_MODAL),
            map((action) => {
                this.modalController.create({
                    component: CreateEntryComponent,
                }).then(modal => modal.present());
                // this.router.navigate([ROUTE_ENTRIES_CREATE]);
            })
        );

    @Effect({dispatch: false})
    closeEntryModal$ = this.actions$
        .pipe(
            ofType<EntryCloseModal>(EntriesActionTypes.ENTRY_CLOSE_MODAL),
            tap(action => {
                this.modalController.dismiss();
            })
        );

    @Effect()
    saveEntry$: Observable<Action> = this.actions$.pipe(
        ofType<EntrySaveRequested>(EntriesActionTypes.ENTRY_SAVE_REQUESTED),
        map((action: EntrySaveRequested) => action.payload),
        switchMap(payload => {
            return this.entriesService
                .save(payload.entry)
                .pipe(
                    map((entryWithId) => {
                        return new EntrySaveSucess({entry: entryWithId});
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new EntrySaveFailed(error.message));
                    })
                );
        })
    );

    @Effect()
    saveEntrySucess$: Observable<Action> = this.actions$.pipe(
        ofType<EntrySaveSucess>(EntriesActionTypes.ENTRY_SAVE_SUCESS),
        map((action) => {
            this.toastController.create({
                message: `Mood ${action.payload.entry.name} saved.`,
                duration: 2000,
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            console.log('Close Toast clicked');
                        }
                    }]
            }).then(toast => toast.present());
            return new EntryCloseModal();
        })
    );


    @Effect()
    saveMoodSucess$: Observable<Action> = this.actions$.pipe(
        ofType<MoodSaveSucess>(MoodsActionTypes.MOOD_SAVE_SUCESS),
        map((action) => {
            this.toastController.create({
                message: `Mood ${action.payload.mood.name} saved.`,
                duration: 2000,
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            console.log('Close Toast clicked');
                        }
                    }]
            }).then(toast => toast.present());
            return new MoodCloseModal();
        })
    );

}
