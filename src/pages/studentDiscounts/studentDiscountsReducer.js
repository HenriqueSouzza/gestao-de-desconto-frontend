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
    scholarship: {},
    detail: {},
    loading: false,
    validate: [],
    valueForm: [],
    firstInstallmentForm: [],
    lastInstallmentForm: [],
    discounts: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case type.STUDENT_DISCOUNTS_LOAD:
            return { ...state, loading: action.payload };
        
        case type.STUDENT_DISCOUNTS_FETCHED:
            return { ...state, list: getListTransform(action.payload.data) || INITIAL_STATE.list, loading: false }

        case type.STUDENT_DISCOUNTS_SCHOLARSHIP_FETCHED:
            return { ...state, scholarship: action.payload.data.response.content || INITIAL_STATE.list }
            
        case type.STUDENT_DISCOUNTS_SAVE_VALUE_INPUT:
            return { ...state, valueForm: action.payload || INITIAL_STATE.list }

        default: 
            return state;
    }

}