import {Action} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IActivity} from '../models/activity';
import {ActivitiesActions, ActivitiesActionTypes} from '../actions/activities.actions';


export interface ActivitiesState extends EntityState<IActivity> {
    activitiesLoaded: boolean;
}

export const adapter: EntityAdapter<IActivity> =
    createEntityAdapter<IActivity>();

export const initialActivitiesState: ActivitiesState = adapter.getInitialState({
    activitiesLoaded: false
});

export function activitiesReducer(state = initialActivitiesState, action: ActivitiesActions): ActivitiesState {
    switch (action.type) {
        case ActivitiesActionTypes.ActivitiesLoaded:
            return adapter.addAll(action.payload.activities, {...state, activitiesLoaded: true});

        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = adapter.getSelectors();
