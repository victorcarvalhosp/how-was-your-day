import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EntriesState} from '../reducers/entries.reducer';
import * as fromEntry from '../reducers/entries.reducer';



export const selectEntriesState = createFeatureSelector<EntriesState>('entries');

export const selectEntryById = (entryId: string) => createSelector(
    selectEntriesState,
    entriesState => entriesState.entities[entryId]
);

export const selectAllEntries = createSelector(
    selectEntriesState,
    fromEntry.selectAll
);

export const selectEntry = createSelector(
    selectEntriesState,
    entriesState => entriesState.entry
);

export const entriesLoaded = createSelector(
    selectEntriesState,
    entriesState => entriesState.entriesLoaded
);

export const isEntriesLoading = createSelector(
    selectEntriesState,
    state => state.loadingList
);

export const isEntryLoadingSave = createSelector(
    selectEntriesState,
    state => state.loadingSave
);


