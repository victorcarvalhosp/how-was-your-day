import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IMood} from '../models/mood';
import {MoodsActions, MoodsActionTypes} from '../actions/moods.actions';


export interface MoodsState extends EntityState<IMood> {
    loadingList: boolean;
    moodsLoaded: boolean;
    listErrorMessage: string;
    mood: IMood;
    loadingSave: boolean;
    saveErrorMessage: string;
}

export const moodsAdapter: EntityAdapter<IMood> =
    createEntityAdapter<IMood>({
        sortComparer: sortByOrder,
        selectId: mood => mood.id
    });

function sortByOrder(a: IMood, b: IMood) {
    if (a.order < b.order) {
        return 1;
    }
    if (a.order > b.order) {
        return -1;
    }
    return 0;
}

export const initialMoodsState: MoodsState = moodsAdapter.getInitialState({
    loadingList: false,
    moodsLoaded: false,
    mood: null,
    loadingSave: false,
    saveErrorMessage: '',
    listErrorMessage: '',
});

export function moodsReducer(state = initialMoodsState, action: MoodsActions): MoodsState {
    switch (action.type) {
        case MoodsActionTypes.MOODS_REQUESTED_WITH_CACHE || MoodsActionTypes.MOODS_REQUESTED_FROM_API:
            return {...state, loadingList: true, listErrorMessage: ''};
        case MoodsActionTypes.MOODS_LOADED:
            return moodsAdapter.addAll(action.payload.moods, {...state, moodsLoaded: true, loadingList: false});
        case MoodsActionTypes.MOODS_REQUEST_FAILED:
            return {...state, loadingList: false, listErrorMessage: action.payload.saveErrorMessage};
        case MoodsActionTypes.MOODS_STOP_LOADING:
            return {...state, loadingList: false};
        case MoodsActionTypes.MOOD_OPEN_MODAL:
            return {...state, mood: action.payload.mood};
        case MoodsActionTypes.MOOD_CLOSE_MODAL:
            return {...state, mood: null};
        case MoodsActionTypes.MOOD_SAVE_REQUESTED:
            return {...state, loadingSave: true};
        case MoodsActionTypes.MOOD_SAVE_SUCESS:
            return moodsAdapter.upsertOne(action.payload.mood, {...state, loadingSave: false, saveErrorMessage: ''});
        case MoodsActionTypes.MOOD_SAVE_FAILED:
            return {...state, loadingSave: false, saveErrorMessage: action.payload.saveErrorMessage};
        case MoodsActionTypes.MOODS_SAVE_CHANGE_ORDER_REQUESTED:
            return {...state, loadingSave: true};
        case MoodsActionTypes.MOODS_SAVE_CHANGE_ORDER_SUCESS:
            return moodsAdapter.upsertMany(action.payload.moods, {...state, loadingSave: false, saveErrorMessage: ''});
        case MoodsActionTypes.MOODS_SAVE_CHANGE_ORDER_FAILED:
            return {...state, loadingSave: false, saveErrorMessage: action.payload.saveErrorMessage};
        case MoodsActionTypes.MOOD_REMOVE_REQUESTED:
            return {...state, loadingSave: true};
        case MoodsActionTypes.MOOD_REMOVE_SUCESS:
            return moodsAdapter.removeOne(action.payload.id, {...state, loadingSave: false, saveErrorMessage: ''});
        case MoodsActionTypes.MOOD_REMOVE_FAILED:
            return {...state, loadingSave: false, saveErrorMessage: action.payload.saveErrorMessage};
        case MoodsActionTypes.MOOD_OPEN_ALERT_REMOVE:
            return {...state, mood: action.payload.mood};
        case MoodsActionTypes.MOOD_CLOSE_ALERT_REMOVE:
            return {...state};
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = moodsAdapter.getSelectors();
