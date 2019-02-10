import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {
    MoodCloseModal,
    MoodOpenModal,
    MoodsActionTypes,
    MoodSaveFailed,
    MoodSaveRequested,
    MoodSaveSucess,
    MoodsLoaded,
    MoodsRequestedFromApi,
    MoodsRequestedWithCache,
    MoodsRequestFailed,
    MoodsStopLoading
} from '../actions/moods.actions';
import {moodsLoaded} from '../selectors/moods.selectors';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {MoodsService} from '../services/moods.service';
import {Observable, of} from 'rxjs';
import {CreateMoodComponent} from '../pages/create-mood/create-mood.component';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';


@Injectable()
export class MoodsEffects {


    constructor(private actions$: Actions, private store: Store<AppState>, private moodsService: MoodsService,
                private modalController: ModalController, private router: Router) {
    }


    @Effect()
    loadAllMoods$: Observable<Action> = this.actions$
        .pipe(
            ofType<MoodsRequestedWithCache>(MoodsActionTypes.MOODS_REQUESTED_WITH_CACHE),
            withLatestFrom(this.store.pipe(select(moodsLoaded))),
            map(([action, loaded]) => [action, loaded]),
            switchMap(([action, loaded]) => {
                let obs;
                if (loaded) {
                    obs = of(new MoodsStopLoading());
                } else {
                    obs = of(new MoodsRequestedFromApi());
                }
                return obs;
            })
        );


    @Effect()
    loadAllMoodsFromApi$: Observable<Action> = this.actions$
        .pipe(
            ofType<MoodsRequestedFromApi>(MoodsActionTypes.MOODS_REQUESTED_FROM_API),
            switchMap((action) => {
                return this.moodsService.findAll().pipe(
                    map(moods => {
                        return new MoodsLoaded({moods});
                    }),
                    catchError(err => {
                        return of(new MoodsRequestFailed(err.message));
                    })
                );
            })
        );


    @Effect({dispatch: false})
    openMoodModal$ = this.actions$
        .pipe(
            ofType<MoodOpenModal>(MoodsActionTypes.MOOD_OPEN_MODAL),
            map((action) => {
                this.modalController.create({
                    component: CreateMoodComponent,
                }).then(modal => modal.present());
                // this.router.navigate([ROUTE_MOODS_CREATE]);
            })
        );

    @Effect({dispatch: false})
    closeMoodModal$ = this.actions$
        .pipe(
            ofType<MoodCloseModal>(MoodsActionTypes.MOOD_CLOSE_MODAL),
            tap(action => {
                this.modalController.dismiss();
            })
        );

    @Effect()
    saveMood$: Observable<Action> = this.actions$.pipe(
        ofType<MoodSaveRequested>(MoodsActionTypes.MOOD_SAVE_REQUESTED),
        map((action: MoodSaveRequested) => action.payload),
        switchMap(payload => {
            return this.moodsService
                .save(payload.mood)
                .pipe(
                    map(() => {
                        return new MoodSaveSucess({mood: payload.mood});
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new MoodSaveFailed(error.message));
                    })
                );
        })
    );

    @Effect()
    saveMoodSucess$: Observable<Action> = this.actions$.pipe(
        ofType<MoodSaveSucess>(MoodsActionTypes.MOOD_SAVE_SUCESS),
        map(() => {
            return new MoodCloseModal();
        })
    );


    // @Effect()
    // loadAllMoods$: Observable<Action> = this.actions$.pipe(
    //     ofType(MoodsActionTypes.MOODS_REQUESTED_WITH_CACHE),
    //     withLatestFrom(this.store.pipe(select(moodsLoaded))),
    //     switchMap(([, loaded]) => {
    //         if (loaded) {
    //             return new MOODS_STOP_LOADING();
    //         }
    //         return this.moodsService.findAll().pipe(
    //             map((moods) => {
    //                 return new MOODS_LOADED({moods});
    //
    //             })
    //         );
    //     })
    // );


    // @Effect()
    // loadAllMoods$ = this.actions$
    //     .pipe(
    //         ofType<MOODS_REQUESTED_WITH_CACHE>(MoodsActionTypes.MOODS_REQUESTED_WITH_CACHE),
    //         withLatestFrom(this.store.pipe(select(selectAllMoods))),
    //         filter(([action,  moods]) => !!moods),
    //         mergeMap(() => this.moodsService.findAll()),
    //         map(moods => new MOODS_LOADED({moods}))
    //     );

}
