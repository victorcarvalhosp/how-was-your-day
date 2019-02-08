import {Action} from '@ngrx/store';
import {IActivity} from '../models/activity';
import {DocumentChangeAction} from '@angular/fire/firestore';

export enum ActivitiesActionTypes {
    ActivitiesRequested = '[Activities] Activities Requested',
    ActivitiesLoaded = '[Firebase API] Activities Loaded',
    ActivitiesStopLoading = '[Activities] Activities Stop Loading'
}

export class ActivitiesRequested implements Action {
    readonly type = ActivitiesActionTypes.ActivitiesRequested;
}

export class ActivitiesLoaded implements Action {
    readonly type = ActivitiesActionTypes.ActivitiesLoaded;

    constructor(public payload: { activities: IActivity[] }) {
    }
}

export class ActivitiesStopLoading implements Action {
    readonly type = ActivitiesActionTypes.ActivitiesStopLoading;
}


export type ActivitiesActions =
    ActivitiesRequested
    | ActivitiesLoaded
    | ActivitiesStopLoading;
