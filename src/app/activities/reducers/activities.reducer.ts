import {Action} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IActivity} from '../models/activity';
import {ActivitiesActions, ActivitiesActionTypes} from '../actions/activities.actions';


export interface ActivitiesState extends EntityState<IActivity> {
    loading: boolean;
    activitiesLoaded: boolean;
    activity: IActivity;
}

export const activitiesAdapter: EntityAdapter<IActivity> =
    createEntityAdapter<IActivity>();

export const initialActivitiesState: ActivitiesState = activitiesAdapter.getInitialState({
    loading: false,
    activitiesLoaded: false,
    activity: null
});

export function activitiesReducer(state = initialActivitiesState, action: ActivitiesActions): ActivitiesState {
    switch (action.type) {
        case ActivitiesActionTypes.ACTIVITIES_REQUESTED:
            return {...state, loading: true};
        case ActivitiesActionTypes.ACTIVITIES_LOADED:
            return activitiesAdapter.addAll(action.payload.activities, {...state, activitiesLoaded: true, loading: false});
        case ActivitiesActionTypes.ACTIVITIES__STOP_LOADING:
            return {...state, loading: false};
        case ActivitiesActionTypes.ACTIVITY_OPEN_MODAL:
            return {...state, activity: action.payload.activity};
        case ActivitiesActionTypes.ACTIVITY_CLOSE_MODAL:
            return {...state, activity: null};
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
