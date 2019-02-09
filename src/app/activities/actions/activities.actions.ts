import {Action} from '@ngrx/store';
import {IActivity} from '../models/activity';
import {DocumentChangeAction} from '@angular/fire/firestore';

export enum ActivitiesActionTypes {
    ACTIVITIES_REQUESTED = '[Activities] Activities Requested',
    ACTIVITIES_LOADED = '[Firebase API] Activities Loaded',
    ACTIVITIES__STOP_LOADING = '[Activities] Activities Stop Loading',
    ACTIVITY_OPEN_MODAL = '[Activities] Open Modal',
    ACTIVITY_CLOSE_MODAL = '[Activities] Close Modal'
}

export class ActivitiesRequested implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITIES_REQUESTED;
}

export class ActivitiesLoaded implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITIES_LOADED;

    constructor(public payload: { activities: IActivity[] }) {
    }
}

export class ActivityOpenModal implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITY_OPEN_MODAL;

    constructor(public payload: { activity: IActivity }) {
    }
}

export class ActivityCloseModal implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITY_CLOSE_MODAL;
}

export class ActivitiesStopLoading implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITIES__STOP_LOADING;
}


export type ActivitiesActions =
    ActivitiesRequested
    | ActivitiesLoaded
    | ActivitiesStopLoading
    | ActivityOpenModal
    | ActivityCloseModal;
