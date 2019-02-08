import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ActivitiesState} from '../reducers/activities.reducer';
import * as fromActivity from '../reducers/activities.reducer';



export const selectActivitiesState = createFeatureSelector<ActivitiesState>('activities');

export const selectActivityById = (activityId: string) => createSelector(
    selectActivitiesState,
    activitiesState => activitiesState.entities[activityId]
);

export const selectAllActivities = createSelector(
    selectActivitiesState,
    fromActivity.selectAll
);

export const activitiesLoaded = createSelector(
    selectActivitiesState,
    coursesState => coursesState.activitiesLoaded
);

export const isActivitiesLoading = createSelector(
    selectActivitiesState,
    state => state.loading
);


