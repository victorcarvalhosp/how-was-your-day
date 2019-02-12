import {Action} from '@ngrx/store';
import {IEntry} from '../models/entry';

export enum EntriesActionTypes {
    ENTRIES_REQUESTED = '[Entries] Entries Requested',
    ENTRIES_LOADED = '[Firebase API] Entries Loaded',
    ENTRIES_REQUEST_FAILED = '[Firebase API] Entries Request Failed',
    ENTRIES_STOP_LOADING = '[Entries] Entries Stop Loading',
    ENTRY_OPEN_MODAL = '[Entries] Open Modal',
    ENTRY_CLOSE_MODAL = '[Entries] Close Modal',
    ENTRY_SAVE_REQUESTED = '[Entries] Save Request',
    ENTRY_SAVE_SUCESS = '[Entries] Save Sucess',
    ENTRY_SAVE_FAILED = '[Entries] Save Failed'
}

export class EntriesRequested implements Action {
    readonly type = EntriesActionTypes.ENTRIES_REQUESTED;
}

export class EntriesLoaded implements Action {
    readonly type = EntriesActionTypes.ENTRIES_LOADED;

    constructor(public payload: { entries: IEntry[] }) {
    }
}

export class EntryOpenModal implements Action {
    readonly type = EntriesActionTypes.ENTRY_OPEN_MODAL;

    constructor(public payload: { entry: IEntry }) {
    }
}

export class EntryCloseModal implements Action {
    readonly type = EntriesActionTypes.ENTRY_CLOSE_MODAL;
}

export class EntrySaveRequested implements Action {
    readonly type = EntriesActionTypes.ENTRY_SAVE_REQUESTED;

    constructor(public payload: { entry: IEntry }) {
    }
}

export class EntrySaveSucess implements Action {
    readonly type = EntriesActionTypes.ENTRY_SAVE_SUCESS;
    constructor(public payload: { entry: IEntry }) {
    }
}

export class EntrySaveFailed implements Action {
    readonly type = EntriesActionTypes.ENTRY_SAVE_FAILED;
    constructor(public payload: { saveErrorMessage: string }) {
    }
}

export class EntriesStopLoading implements Action {
    readonly type = EntriesActionTypes.ENTRIES_STOP_LOADING;
}

export class EntriesRequestFailed implements Action {
    readonly type = EntriesActionTypes.ENTRIES_REQUEST_FAILED;
    constructor(public payload: { saveErrorMessage: string }) {
    }
}


export type EntriesActions =
    EntriesRequested
    | EntriesLoaded
    | EntriesStopLoading
    | EntryOpenModal
    | EntryCloseModal
    | EntrySaveRequested
    | EntrySaveSucess
    | EntrySaveFailed
    | EntriesRequestFailed;
