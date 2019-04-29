import type from './types';

import { getListTransform, getDetailTransform } from '../../helpers/transformResponse'

/**
 * <b>INITIAL_STATE<b/> Estado inicial 
 */
const INITIAL_STATE = {
    list: {
        content: [],
        pagination: {
            current_page: 0,
            last_page: 0,
            path: '',
            per_page: 0,
            total: 0,

        }
    },
    detail: {},
    loading: false

}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case type.PERMISSIONS_FETCHED:
            return { ...state, list: getListTransform(action.payload.data) || INITIAL_STATE.list, loading: false }

        case type.PERMISSIONS_LOAD:
            return { ...state, loading: action.payload }
            
        default: 
            return state;
    }
}