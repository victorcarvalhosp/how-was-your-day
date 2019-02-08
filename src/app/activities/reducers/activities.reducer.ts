import {Action} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IActivity} from '../models/activity';
import {ActivitiesActions, ActivitiesActionTypes} from '../actions/activities.actions';


export interface ActivitiesState extends EntityState<IActivity> {
    loading: boolean;
    activitiesLoaded: boolean;
}

export const activitiesAdapter: EntityAdapter<IActivity> =
    createEntityAdapter<IActivity>();

export const initialActivitiesState: ActivitiesState = activitiesAdapter.getInitialState({
    loading: false,
    activitiesLoaded: false
});

export function activitiesReducer(state = initialActivitiesState, action: ActivitiesActions): ActivitiesState {
    switch (action.type) {
        case ActivitiesActionTypes.ActivitiesRequested:
            return {...state, loading: true};
        case ActivitiesActionTypes.ActivitiesLoaded:
            return activitiesAdapter.addAll(action.payload.activities, {...state, activitiesLoaded: true, loading: false});
        case ActivitiesActionTypes.ActivitiesStopLoading:
            return {...state, loading: false};
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
