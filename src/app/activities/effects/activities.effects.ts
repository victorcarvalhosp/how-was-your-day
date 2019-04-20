import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {
    ActivitiesActionTypes,
    ActivitiesLoaded,
    ActivitiesRequestedFromApi,
    ActivitiesRequestedWithCache,
    ActivitiesRequestFailed,
    ActivitiesStopLoading,
    ActivityCloseModal,
    ActivityOpenModal, ActivityRemoveFailed, ActivityRemoveRequested, ActivityRemoveSucess,
    ActivitySaveFailed,
    ActivitySaveRequested,
    ActivitySaveSucess
} from '../actions/activities.actions';
import {activitiesLoaded} from '../selectors/activities.selectors';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {ActivitiesService} from '../services/activities.service';
import {Observable, of} from 'rxjs';
import {CreateActivityComponent} from '../pages/create-activity/create-activity.component';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';


@Injectable()
export class ActivitiesEffects {


    constructor(private actions$: Actions, private store: Store<AppState>, private activitiesService: ActivitiesService,
                private modalController: ModalController, private router: Router, public alertController: AlertController,
                public toastController: ToastController) {
    }

    // @Effect()
    // loadAllActivities$ = this.actions$
    //     .pipe(
    //         ofType<ACTIVITIES_REQUESTED_WITH_CACHE>(ActivitiesActionTypes.ACTIVITIES_REQUESTED_WITH_CACHE),
    //         withLatestFrom(this.store.pipe(select(activitiesLoaded))),
    //         filter(([action, loaded]) => {
    //             console.log(loaded + ' ACTIVITIES LOADED?');
    //             return !loaded;
    //         }),
    //         mergeMap(() => this.activitiesService.findAll()),
    //         map(activities => new ACTIVITIES_LOADED({activities})),
    //     );


    @Effect()
    loadAllActivities$: Observable<Action> = this.actions$
        .pipe(
            ofType<ActivitiesRequestedWithCache>(ActivitiesActionTypes.ACTIVITIES_REQUESTED_WITH_CACHE),
            withLatestFrom(this.store.pipe(select(activitiesLoaded))),
            map(([action, loaded]) => [action, loaded]),
            switchMap(([action, loaded]) => {
                console.log('ACTIVITIES EFFECTS');
                let obs;
                if (loaded) {
                    obs = of(new ActivitiesStopLoading());
                } else {
                    obs = of(new ActivitiesRequestedFromApi());
                }
                return obs;
            })
        );


    @Effect()
    loadAllActivitiesFromApi$: Observable<Action> = this.actions$
        .pipe(
            ofType<ActivitiesRequestedFromApi>(ActivitiesActionTypes.ACTIVITIES_REQUESTED_FROM_API),
            switchMap((action) => {
                return this.activitiesService.findAll().pipe(
                    map(activities => {
                        return new ActivitiesLoaded({activities});
                    }),
                    catchError(err => {
                        return of(new ActivitiesRequestFailed(err.message));
                    })
                );
            })
        );


    @Effect({dispatch: false})
    openActivityModal$ = this.actions$
        .pipe(
            ofType<ActivityOpenModal>(ActivitiesActionTypes.ACTIVITY_OPEN_MODAL),
            map((action) => {
                this.modalController.create({
                    component: CreateActivityComponent,
                }).then(modal => modal.present());
                // this.router.navigate([ROUTE_ACTIVITIES_CREATE]);
            })
        );

    @Effect({dispatch: false})
    closeActivityModal$ = this.actions$
        .pipe(
            ofType<ActivityCloseModal>(ActivitiesActionTypes.ACTIVITY_CLOSE_MODAL),
            tap(action => {
                console.log('CHAMOU CLOSE MODAL EFFECT');
                this.modalController.dismiss();
            })
        );

    @Effect()
    saveActivity$: Observable<Action> = this.actions$.pipe(
        ofType<ActivitySaveRequested>(ActivitiesActionTypes.ACTIVITY_SAVE_REQUESTED),
        map((action: ActivitySaveRequested) => action.payload),
        switchMap(payload => {
            return this.activitiesService
                .save(payload.activity)
                .pipe(
                    map((activityWithId) => {
                        return new ActivitySaveSucess({activity: activityWithId});
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new ActivitySaveFailed(error.message));
                    })
                );
        })
    );

    @Effect()
    saveActivitySucess$: Observable<Action> = this.actions$.pipe(
        ofType<ActivitySaveSucess>(ActivitiesActionTypes.ACTIVITY_SAVE_SUCESS),
        map(() => {
            return new ActivityCloseModal();
        })
    );

    @Effect({dispatch: false})
    openActivityAlertRemove$ = this.actions$
        .pipe(
            ofType<ActivityOpenModal>(ActivitiesActionTypes.ACTIVITY_OPEN_ALERT_REMOVE),
            map((action) => {

                this.alertController.create({
                    header: 'Remove activity!',
                    message: `Are you sure you want to remove <strong>${action.payload.activity.name}</strong> activity?`,
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: (blah) => {
                                console.log('Confirm Cancel: blah');
                            }
                        }, {
                            text: 'Yes, remove',
                            handler: () => {
                                this.store.dispatch(new ActivityRemoveRequested({id: action.payload.activity.id}));
                                console.log('Confirm Okay');
                            }
                        }
                    ]
                }).then(alert => alert.present());
            })
        );

    @Effect({dispatch: false})
    closeActivityAlertRemove$ = this.actions$
        .pipe(
            ofType<ActivityCloseModal>(ActivitiesActionTypes.ACTIVITY_CLOSE_ALERT_REMOVE),
            tap(action => {
                this.alertController.dismiss();
            })
        );

    @Effect()
    removeActivity$: Observable<Action> = this.actions$.pipe(
        ofType<ActivityRemoveRequested>(ActivitiesActionTypes.ACTIVITY_REMOVE_REQUESTED),
        map((action: ActivityRemoveRequested) => action.payload),
        switchMap(payload => {
            return this.activitiesService
                .remove(payload.id)
                .pipe(
                    map(() => {
                        return new ActivityRemoveSucess({id: payload.id});
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new ActivityRemoveFailed(error.message));
                    })
                );
        })
    );

    @Effect()
    removeActivitySucess$: Observable<Action> = this.actions$.pipe(
        ofType<ActivityRemoveSucess>(ActivitiesActionTypes.ACTIVITY_REMOVE_SUCESS),
        map(() => {
            this.toastController.create({
                message: 'Activity removed.',
                duration: 2000,
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            console.log('Close Toast clicked');
                        }
                    }]
            }).then(toast => toast.present());
            return new ActivityCloseModal();
        })
    );


    // @Effect()
    // loadAllActivities$: Observable<Action> = this.actions$.pipe(
    //     ofType(ActivitiesActionTypes.ACTIVITIES_REQUESTED_WITH_CACHE),
    //     withLatestFrom(this.store.pipe(select(activitiesLoaded))),
    //     switchMap(([, loaded]) => {
    //         if (loaded) {
    //             return new ACTIVITIES_STOP_LOADING();
    //         }
    //         return this.activitiesService.findAll().pipe(
    //             map((activities) => {
    //                 return new ACTIVITIES_LOADED({activities});
    //
    //             })
    //         );
    //     })
    // );


    // @Effect()
    // loadAllActivities$ = this.actions$
    //     .pipe(
    //         ofType<ACTIVITIES_REQUESTED_WITH_CACHE>(ActivitiesActionTypes.ACTIVITIES_REQUESTED_WITH_CACHE),
    //         withLatestFrom(this.store.pipe(select(selectAllActivities))),
    //         filter(([action,  activities]) => !!activities),
    //         mergeMap(() => this.activitiesService.findAll()),
    //         map(activities => new ACTIVITIES_LOADED({activities}))
    //     );

}
