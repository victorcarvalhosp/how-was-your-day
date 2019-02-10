import {Action} from '@ngrx/store';
import {IActivity} from '../models/activity';
import {DocumentChangeAction} from '@angular/fire/firestore';

export enum ActivitiesActionTypes {
    ACTIVITIES_REQUESTED_WITH_CACHE = '[Activities] Activities Requested',
    ACTIVITIES_REQUESTED_FROM_API = '[Firebase API] Activities Requested From API',
    ACTIVITIES_LOADED = '[Firebase API] Activities Loaded',
    ACTIVITIES_REQUEST_FAILED = '[Firebase API] Activities Request Failed',
    ACTIVITIES_STOP_LOADING = '[Activities] Activities Stop Loading',
    ACTIVITY_OPEN_MODAL = '[Activities] Open Modal',
    ACTIVITY_CLOSE_MODAL = '[Activities] Close Modal',
    ACTIVITY_SAVE_REQUESTED = '[Activities] Save Request',
    ACTIVITY_SAVE_SUCESS = '[Activities] Save Sucess',
    ACTIVITY_SAVE_FAILED = '[Activities] Save Failed'
}

export class ActivitiesRequestedWithCache implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITIES_REQUESTED_WITH_CACHE;
}

export class ActivitiesRequestedFromApi implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITIES_REQUESTED_FROM_API;
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

export class ActivitySaveRequested implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITY_SAVE_REQUESTED;

    constructor(public payload: { activity: IActivity }) {
    }
}

export class ActivitySaveSucess implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITY_SAVE_SUCESS;
    constructor(public payload: { activity: IActivity }) {
    }
}

export class ActivitySaveFailed implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITY_SAVE_FAILED;
    constructor(public payload: { saveErrorMessage: string }) {
    }
}

export class ActivitiesStopLoading implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITIES_STOP_LOADING;
}

export class ActivitiesRequestFailed implements Action {
    readonly type = ActivitiesActionTypes.ACTIVITIES_REQUEST_FAILED;
    constructor(public payload: { saveErrorMessage: string }) {
    }
}


export type ActivitiesActions =
    ActivitiesRequestedWithCache
    | ActivitiesLoaded
    | ActivitiesStopLoading
    | ActivityOpenModal
    | ActivityCloseModal
    | ActivitySaveRequested
    | ActivitySaveSucess
    | ActivitySaveFailed
    | ActivitiesRequestedFromApi
    | ActivitiesRequestFailed;
