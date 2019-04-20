import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IActivity} from '../models/activity';
import {ActivitiesActions, ActivitiesActionTypes} from '../actions/activities.actions';


export interface ActivitiesState extends EntityState<IActivity> {
    loadingList: boolean;
    activitiesLoaded: boolean;
    listErrorMessage: string;
    activity: IActivity;
    loadingSave: boolean;
    saveErrorMessage: string;
}

export const activitiesAdapter: EntityAdapter<IActivity> =
    createEntityAdapter<IActivity>({
        sortComparer: sortByName
    });

function sortByName(a: IActivity, b: IActivity) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export const initialActivitiesState: ActivitiesState = activitiesAdapter.getInitialState({
    loadingList: false,
    activitiesLoaded: false,
    activity: null,
    loadingSave: false,
    saveErrorMessage: '',
    listErrorMessage: '',
});

export function activitiesReducer(state = initialActivitiesState, action: ActivitiesActions): ActivitiesState {
    switch (action.type) {
        case ActivitiesActionTypes.ACTIVITIES_REQUESTED_WITH_CACHE || ActivitiesActionTypes.ACTIVITIES_REQUESTED_FROM_API:
            return {...state, loadingList: true, listErrorMessage: ''};
        case ActivitiesActionTypes.ACTIVITIES_LOADED:
            return activitiesAdapter.addAll(action.payload.activities, {...state, activitiesLoaded: true, loadingList: false});
        case ActivitiesActionTypes.ACTIVITIES_REQUEST_FAILED:
            return {...state, loadingList: false, listErrorMessage: action.payload.saveErrorMessage};
        case ActivitiesActionTypes.ACTIVITIES_STOP_LOADING:
            return {...state, loadingList: false};
        case ActivitiesActionTypes.ACTIVITY_OPEN_MODAL:
            return {...state, activity: action.payload.activity};
        case ActivitiesActionTypes.ACTIVITY_CLOSE_MODAL:
            return {...state, activity: null};
        case ActivitiesActionTypes.ACTIVITY_SAVE_REQUESTED:
            return {...state, loadingSave: true};
        case ActivitiesActionTypes.ACTIVITY_SAVE_SUCESS:
            return activitiesAdapter.upsertOne(action.payload.activity, {...state, loadingSave: false, saveErrorMessage: ''});
        case ActivitiesActionTypes.ACTIVITY_SAVE_FAILED:
            return {...state, loadingSave: false, saveErrorMessage: action.payload.saveErrorMessage};
        case ActivitiesActionTypes.ACTIVITY_REMOVE_REQUESTED:
            return {...state, loadingSave: true};
        case ActivitiesActionTypes.ACTIVITY_REMOVE_SUCESS:
            return activitiesAdapter.removeOne(action.payload.id, {...state, loadingSave: false, saveErrorMessage: ''});
        case ActivitiesActionTypes.ACTIVITY_REMOVE_FAILED:
            return {...state, loadingSave: false, saveErrorMessage: action.payload.saveErrorMessage};
        case ActivitiesActionTypes.ACTIVITY_OPEN_ALERT_REMOVE:
            return {...state, activity: action.payload.activity};
        case ActivitiesActionTypes.ACTIVITY_CLOSE_ALERT_REMOVE:
            return {...state};
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = activitiesAdapter.getSelectors();
