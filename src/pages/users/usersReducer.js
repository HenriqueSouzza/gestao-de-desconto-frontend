import type from './types';

import { getDetailTransform, getListTransform } from '../../helpers/transformResponse';

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
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case type.USERS_FETCHED: 
            return { ...state, list: getListTransform(action.payload.data) || INITIAL_STATE.list, loading: false }
        
        case type.USERS_DETAIL:
            return { ...state, detail: getDetailTransform(action.payload.data) || INITIAL_STATE.list, loading: false }

        case type.USERS_LOAD:
            return { ...state, loading: action.payload }
            
        default: 
            return state;

        
    }
}