import {Action} from '@ngrx/store';
import {IActivity} from '../models/activity';

export enum ActivitiesActionTypes {
    ActivitiesRequested = '[Activities] Activities Requested',
    ActivitiesLoaded = '[Firebase API] Activities Loaded'
}

export class ActivitiesRequested implements Action {
    readonly type = ActivitiesActionTypes.ActivitiesRequested;

}

export class ActivitiesLoaded implements Action {
    readonly type = ActivitiesActionTypes.ActivitiesLoaded;

    constructor(public payload: { activities: IActivity[] }) {

    }

}


export type ActivitiesActions =
    ActivitiesRequested
    | ActivitiesLoaded;
