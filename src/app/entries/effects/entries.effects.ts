import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {
    EntriesActionTypes,
    EntriesLoaded,
    EntriesRequestedFromApi,
    EntriesRequestedWithCache,
    EntriesRequestFailed,
    EntriesStopLoading,
    EntryCloseModal,
    EntryOpenModal,
    EntrySaveFailed,
    EntrySaveRequested,
    EntrySaveSucess
} from '../actions/entries.actions';
import {entriesLoaded} from '../selectors/entries.selectors';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EntriesService} from '../services/entries.service';
import {Observable, of} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';


@Injectable()
export class EntriesEffects {


    constructor(private actions$: Actions, private store: Store<AppState>, private entriesService: EntriesService,
                private modalController: ModalController, private router: Router) {
    }


    @Effect()
    loadAllEntries$: Observable<Action> = this.actions$
        .pipe(
            ofType<EntriesRequestedWithCache>(EntriesActionTypes.ENTRIES_REQUESTED_WITH_CACHE),
            withLatestFrom(this.store.pipe(select(entriesLoaded))),
            map(([action, loaded]) => [action, loaded]),
            switchMap(([action, loaded]) => {
                let obs;
                if (loaded) {
                    obs = of(new EntriesStopLoading());
                } else {
                    obs = of(new EntriesRequestedFromApi());
                }
                return obs;
            })
        );


    @Effect()
    loadAllEntriesFromApi$: Observable<Action> = this.actions$
        .pipe(
            ofType<EntriesRequestedFromApi>(EntriesActionTypes.ENTRIES_REQUESTED_FROM_API),
            switchMap((action) => {
                return this.entriesService.findAll().pipe(
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
                // this.modalController.create({
                //     component: CreateEntryComponent,
                // }).then(modal => modal.present());
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
                    map(() => {
                        return new EntrySaveSucess({entry: payload.entry});
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
        map(() => {
            return new EntryCloseModal();
        })
    );


    // @Effect()
    // loadAllEntries$: Observable<Action> = this.actions$.pipe(
    //     ofType(EntriesActionTypes.ENTRIES_REQUESTED_WITH_CACHE),
    //     withLatestFrom(this.store.pipe(select(entriesLoaded))),
    //     switchMap(([, loaded]) => {
    //         if (loaded) {
    //             return new ENTRIES_STOP_LOADING();
    //         }
    //         return this.entriesService.findAll().pipe(
    //             map((entries) => {
    //                 return new ENTRIES_LOADED({entries});
    //
    //             })
    //         );
    //     })
    // );


    // @Effect()
    // loadAllEntries$ = this.actions$
    //     .pipe(
    //         ofType<ENTRIES_REQUESTED_WITH_CACHE>(EntriesActionTypes.ENTRIES_REQUESTED_WITH_CACHE),
    //         withLatestFrom(this.store.pipe(select(selectAllEntries))),
    //         filter(([action,  entries]) => !!entries),
    //         mergeMap(() => this.entriesService.findAll()),
    //         map(entries => new ENTRIES_LOADED({entries}))
    //     );

}
