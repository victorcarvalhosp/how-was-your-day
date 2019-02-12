import {Action} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IEntry} from '../models/entry';
import {EntriesActions, EntriesActionTypes} from '../actions/entries.actions';


export interface EntriesState extends EntityState<IEntry> {
    loadingList: boolean;
    listErrorMessage: string;
    entry: IEntry;
    loadingSave: boolean;
    saveErrorMessage: string;
}

export const entriesAdapter: EntityAdapter<IEntry> =
    createEntityAdapter<IEntry>({
        sortComparer: sortByName
    });

function sortByName(a: IEntry, b: IEntry) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export const initialEntriesState: EntriesState = entriesAdapter.getInitialState({
    loadingList: false,
    entry: null,
    loadingSave: false,
    saveErrorMessage: '',
    listErrorMessage: '',
});

export function entriesReducer(state = initialEntriesState, action: EntriesActions): EntriesState {
    switch (action.type) {
        case EntriesActionTypes.ENTRIES_REQUESTED:
            return {...state, loadingList: true, listErrorMessage: ''};
        case EntriesActionTypes.ENTRIES_LOADED:
            return entriesAdapter.addAll(action.payload.entries, {...state, loadingList: false});
        case EntriesActionTypes.ENTRIES_REQUEST_FAILED:
            return {...state, loadingList: false, listErrorMessage: action.payload.saveErrorMessage};
        case EntriesActionTypes.ENTRIES_STOP_LOADING:
            return {...state, loadingList: false};
        case EntriesActionTypes.ENTRY_OPEN_MODAL:
            return {...state, entry: action.payload.entry};
        case EntriesActionTypes.ENTRY_CLOSE_MODAL:
            return {...state, entry: null};
        case EntriesActionTypes.ENTRY_SAVE_REQUESTED:
            return {...state, loadingSave: true};
        case EntriesActionTypes.ENTRY_SAVE_SUCESS:
            return entriesAdapter.upsertOne(action.payload.entry, {...state, loadingSave: false, saveErrorMessage: ''});
            // return {...state, loadingSave: false, saveErrorMessage: ''};
        case EntriesActionTypes.ENTRY_SAVE_FAILED:
            return {...state, loadingSave: false, saveErrorMessage: action.payload.saveErrorMessage};
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = entriesAdapter.getSelectors();
