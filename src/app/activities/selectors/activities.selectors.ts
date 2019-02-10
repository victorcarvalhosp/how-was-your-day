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

export const selectActivity = createSelector(
    selectActivitiesState,
    activitiesState => activitiesState.activity
);

export const activitiesLoaded = createSelector(
    selectActivitiesState,
    activitiesState => activitiesState.activitiesLoaded
);

export const isActivitiesLoading = createSelector(
    selectActivitiesState,
    state => state.loadingList
);

export const isActivityLoadingSave = createSelector(
    selectActivitiesState,
    state => state.loadingSave
);


