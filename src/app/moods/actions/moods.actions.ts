import {Action} from '@ngrx/store';
import {IMood} from '../models/mood';
import {DocumentChangeAction} from '@angular/fire/firestore';

export enum MoodsActionTypes {
    MOODS_REQUESTED_WITH_CACHE = '[Moods] Moods Requested',
    MOODS_REQUESTED_FROM_API = '[Firebase API] Moods Requested From API',
    MOODS_LOADED = '[Firebase API] Moods Loaded',
    MOODS_REQUEST_FAILED = '[Firebase API] Moods Request Failed',
    MOODS_STOP_LOADING = '[Moods] Moods Stop Loading',
    MOOD_OPEN_MODAL = '[Moods] Open Modal',
    MOOD_CLOSE_MODAL = '[Moods] Close Modal',
    MOOD_SAVE_REQUESTED = '[Moods] Save Request',
    MOOD_SAVE_SUCESS = '[Moods] Save Sucess',
    MOOD_SAVE_FAILED = '[Moods] Save Failed',
    MOODS_SAVE_CHANGE_ORDER_REQUESTED = '[Moods] Save Change Order Request',
    MOODS_SAVE_CHANGE_ORDER_SUCESS = '[Moods] Save Change Order Sucess',
    MOODS_SAVE_CHANGE_ORDER_FAILED = '[Moods] Save Change Order Failed'
}

export class MoodsRequestedWithCache implements Action {
    readonly type = MoodsActionTypes.MOODS_REQUESTED_WITH_CACHE;
}

export class MoodsRequestedFromApi implements Action {
    readonly type = MoodsActionTypes.MOODS_REQUESTED_FROM_API;
}

export class MoodsLoaded implements Action {
    readonly type = MoodsActionTypes.MOODS_LOADED;

    constructor(public payload: { moods: IMood[] }) {
    }
}

export class MoodOpenModal implements Action {
    readonly type = MoodsActionTypes.MOOD_OPEN_MODAL;

    constructor(public payload: { mood: IMood }) {
    }
}

export class MoodCloseModal implements Action {
    readonly type = MoodsActionTypes.MOOD_CLOSE_MODAL;
}

export class MoodSaveRequested implements Action {
    readonly type = MoodsActionTypes.MOOD_SAVE_REQUESTED;

    constructor(public payload: { mood: IMood }) {
    }
}

export class MoodSaveSucess implements Action {
    readonly type = MoodsActionTypes.MOOD_SAVE_SUCESS;

    constructor(public payload: { mood: IMood }) {
    }
}

export class MoodSaveFailed implements Action {
    readonly type = MoodsActionTypes.MOOD_SAVE_FAILED;

    constructor(public payload: { saveErrorMessage: string }) {
    }
}

export class MoodsStopLoading implements Action {
    readonly type = MoodsActionTypes.MOODS_STOP_LOADING;
}

export class MoodsRequestFailed implements Action {
    readonly type = MoodsActionTypes.MOODS_REQUEST_FAILED;

    constructor(public payload: { saveErrorMessage: string }) {
    }
}

export class MoodsSaveChangeOrderRequested implements Action {
    readonly type = MoodsActionTypes.MOODS_SAVE_CHANGE_ORDER_REQUESTED;

    constructor(public payload: { moods: IMood[] }) {
    }
}


export class MoodsSaveChangeOrderFailed implements Action {
    readonly type = MoodsActionTypes.MOODS_SAVE_CHANGE_ORDER_FAILED;

    constructor(public payload: { saveErrorMessage: string }) {
    }
}

export class MoodsSaveChangeOrderSucess implements Action {
    readonly type = MoodsActionTypes.MOODS_SAVE_CHANGE_ORDER_SUCESS;

    constructor(public payload: { moods: IMood[] }) {
    }
}


export type MoodsActions =
    MoodsRequestedWithCache
    | MoodsLoaded
    | MoodsStopLoading
    | MoodOpenModal
    | MoodCloseModal
    | MoodSaveRequested
    | MoodSaveSucess
    | MoodSaveFailed
    | MoodsRequestedFromApi
    | MoodsRequestFailed
    | MoodsSaveChangeOrderRequested
    | MoodsSaveChangeOrderFailed
    | MoodsSaveChangeOrderSucess;
