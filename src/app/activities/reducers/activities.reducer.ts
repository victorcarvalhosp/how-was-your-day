import {Action} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IActivity} from '../models/activity';
import {ActivitiesActions, ActivitiesActionTypes} from '../actions/activities.actions';


export interface ActivitiesState extends EntityState<IActivity> {
    loadingList: boolean;
    activitiesLoaded: boolean;
    activity: IActivity;
    loadingSave: boolean;
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
    loadingSave: false
});

export function activitiesReducer(state = initialActivitiesState, action: ActivitiesActions): ActivitiesState {
    switch (action.type) {
        case ActivitiesActionTypes.ACTIVITIES_REQUESTED:
            return {...state, loadingList: true};
        case ActivitiesActionTypes.ACTIVITIES_LOADED:
            return activitiesAdapter.addAll(action.payload.activities, {...state, activitiesLoaded: true, loadingList: false});
        case ActivitiesActionTypes.ACTIVITIES__STOP_LOADING:
            return {...state, loadingList: false};
        case ActivitiesActionTypes.ACTIVITY_OPEN_MODAL:
            return {...state, activity: action.payload.activity};
        case ActivitiesActionTypes.ACTIVITY_CLOSE_MODAL:
            return {...state, activity: null};
        // case ActivitiesActionTypes.ACTIVITY_SAVE_REQUESTED:
        //     return {...state, loadingSave: true};
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
