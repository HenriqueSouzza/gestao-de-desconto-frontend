import type from './types';
import { getListTransform, getDetailTransform } from '../../helpers/transformResponse';

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

	switch (action.type) {
        case type.ROLES_FETCHED:

			return {
				...state,
                list: getListTransform(action.payload.data) || INITIAL_STATE.list,
                loading: false
                
            };
            
        case type.ROLES_DETAIL:
        
			return {
				...state,
                detail: getDetailTransform(action.payload.data) || INITIAL_STATE.detail,
                loading: false
                
            };

        case type.ROLES_LOAD:

			return {
				...state,
                loading: action.payload
            };

        case type.ROLES_DETAIL:
            console.log(...state)
            
		default: return state;
	}
};

