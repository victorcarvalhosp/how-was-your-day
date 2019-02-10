import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MoodsState} from '../reducers/moods.reducer';
import * as fromMood from '../reducers/moods.reducer';



export const selectMoodsState = createFeatureSelector<MoodsState>('moods');

export const selectMoodById = (moodId: string) => createSelector(
    selectMoodsState,
    moodsState => moodsState.entities[moodId]
);

export const selectAllMoods = createSelector(
    selectMoodsState,
    fromMood.selectAll
);

export const selectMood = createSelector(
    selectMoodsState,
    moodsState => moodsState.mood
);

export const moodsLoaded = createSelector(
    selectMoodsState,
    moodsState => moodsState.moodsLoaded
);

export const isMoodsLoading = createSelector(
    selectMoodsState,
    state => state.loadingList
);

export const isMoodLoadingSave = createSelector(
    selectMoodsState,
    state => state.loadingSave
);


