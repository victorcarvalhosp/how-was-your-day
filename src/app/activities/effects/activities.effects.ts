import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {
    ActivitiesActionTypes,
    ActivitiesLoaded,
    ActivitiesRequested,
    ActivitiesStopLoading, ActivityCloseModal,
    ActivityOpenModal, ActivitySaveFailed, ActivitySaveRequested, ActivitySaveSucess
} from '../actions/activities.actions';
import {activitiesLoaded, selectAllActivities} from '../selectors/activities.selectors';
import {catchError, filter, finalize, map, mergeMap, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {ActivitiesService} from '../services/activities.service';
import {EMPTY, from, Observable, of, pipe} from 'rxjs';
import {CreateActivityComponent} from '../pages/create-activity/create-activity.component';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ROUTE_ACTIVITIES_CREATE} from '../../shared/router/routes.constants';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AuthActionTypes, Login, LoginFailed, LoginSuccess} from '../../auth/actions/auth.actions';


@Injectable()
export class ActivitiesEffects {


    constructor(private actions$: Actions, private store: Store<AppState>, private activitiesService: ActivitiesService,
                private modalController: ModalController, private router: Router) {
    }

    // @Effect()
    // loadAllActivities$ = this.actions$
    //     .pipe(
    //         ofType<ACTIVITIES_REQUESTED>(ActivitiesActionTypes.ACTIVITIES_REQUESTED),
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
            ofType<ActivitiesRequested>(ActivitiesActionTypes.ACTIVITIES_REQUESTED),
            withLatestFrom(this.store.pipe(select(activitiesLoaded))),
            map(([action, loaded]) => [action, loaded]),
            switchMap(([action, loaded]) => {
                console.log('CHAMOU loadAllActivities$ EFFECT');
                let obs;
                if (loaded) {
                    obs = of(new ActivitiesStopLoading());
                } else {
                    obs = this.activitiesService.findAll().pipe(
                        map(activities => {
                            return new ActivitiesLoaded({activities});
                        })
                    );
                }
                return obs;
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
                    map(() => {
                        return new ActivitySaveSucess({activity: payload.activity});
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


    // @Effect()
    // loadAllActivities$: Observable<Action> = this.actions$.pipe(
    //     ofType(ActivitiesActionTypes.ACTIVITIES_REQUESTED),
    //     withLatestFrom(this.store.pipe(select(activitiesLoaded))),
    //     switchMap(([, loaded]) => {
    //         if (loaded) {
    //             return new ACTIVITIES__STOP_LOADING();
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
    //         ofType<ACTIVITIES_REQUESTED>(ActivitiesActionTypes.ACTIVITIES_REQUESTED),
    //         withLatestFrom(this.store.pipe(select(selectAllActivities))),
    //         filter(([action,  activities]) => !!activities),
    //         mergeMap(() => this.activitiesService.findAll()),
    //         map(activities => new ACTIVITIES_LOADED({activities}))
    //     );

}
