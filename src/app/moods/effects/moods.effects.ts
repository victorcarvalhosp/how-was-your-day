import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {
    MoodCloseAlertRemove,
    MoodCloseModal,
    MoodOpenModal, MoodRemoveFailed, MoodRemoveRequested, MoodRemoveSucess,
    MoodsActionTypes,
    MoodSaveFailed,
    MoodSaveRequested,
    MoodSaveSucess,
    MoodsLoaded,
    MoodsRequestedFromApi,
    MoodsRequestedWithCache,
    MoodsRequestFailed, MoodsSaveChangeOrderFailed, MoodsSaveChangeOrderRequested, MoodsSaveChangeOrderSucess,
    MoodsStopLoading
} from '../actions/moods.actions';
import {moodsLoaded} from '../selectors/moods.selectors';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {MoodsService} from '../services/moods.service';
import {Observable, of} from 'rxjs';
import {CreateMoodComponent} from '../pages/create-mood/create-mood.component';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';


@Injectable()
export class MoodsEffects {


    constructor(private actions$: Actions, private store: Store<AppState>, private moodsService: MoodsService,
                private modalController: ModalController, private router: Router, public alertController: AlertController,
                public toastController: ToastController) {
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
                    map((moodWithId) => {
                        return new MoodSaveSucess({mood: moodWithId});
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


    @Effect()
    saveMoodsChangeOrder$: Observable<Action> = this.actions$.pipe(
        ofType<MoodsSaveChangeOrderRequested>(MoodsActionTypes.MOODS_SAVE_CHANGE_ORDER_REQUESTED),
        map((action: MoodsSaveChangeOrderRequested) => action.payload),
        switchMap(payload => {
            return this.moodsService
                .saveAllChangingOrder(payload.moods)
                .pipe(
                    map((moodsReordered) => {
                        console.log('Está vindo certo?');
                        console.log(moodsReordered);
                        return new MoodsSaveChangeOrderSucess({moods: moodsReordered});
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new MoodsSaveChangeOrderFailed(error.message));
                    })
                );
        })
    );

    @Effect({dispatch: false})
    openMoodAlertRemove$ = this.actions$
        .pipe(
            ofType<MoodOpenModal>(MoodsActionTypes.MOOD_OPEN_ALERT_REMOVE),
            map((action) => {

                this.alertController.create({
                    header: 'Confirm!',
                    message: `Remove <strong>${action.payload.mood.name}</strong>!!!`,
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: (blah) => {
                                console.log('Confirm Cancel: blah');
                            }
                        }, {
                            text: 'Remove',
                            handler: () => {
                                this.store.dispatch(new MoodRemoveRequested({id: action.payload.mood.id}));
                                console.log('Confirm Okay');
                            }
                        }
                    ]
                }).then(alert => alert.present());
            })
        );

    @Effect({dispatch: false})
    closeMoodAlertRemove$ = this.actions$
        .pipe(
            ofType<MoodCloseModal>(MoodsActionTypes.MOOD_CLOSE_ALERT_REMOVE),
            tap(action => {
                this.alertController.dismiss();
            })
        );

    @Effect()
    removeMood$: Observable<Action> = this.actions$.pipe(
        ofType<MoodRemoveRequested>(MoodsActionTypes.MOOD_REMOVE_REQUESTED),
        map((action: MoodRemoveRequested) => action.payload),
        switchMap(payload => {
            return this.moodsService
                .remove(payload.id)
                .pipe(
                    map(() => {
                        return new MoodRemoveSucess({id: payload.id});
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new MoodRemoveFailed(error.message));
                    })
                );
        })
    );

    @Effect()
    removeMoodSucess$: Observable<Action> = this.actions$.pipe(
        ofType<MoodRemoveSucess>(MoodsActionTypes.MOOD_REMOVE_SUCESS),
        map(() => {
            this.toastController.create({
                message: 'Mood removed.',
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

    // @Effect()
    // saveMoodsChangeOrderSucess$: Observable<Action> = this.actions$.pipe(
    //     ofType<MoodsSaveChangeOrderSucess>(MoodsActionTypes.MOODS_SAVE_CHANGE_ORDER_SUCESS),
    //     map(() => {
    //         return new MoodsRequestedWithCache();
    //     })
    // );


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
