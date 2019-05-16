import type from './types';

import { ESTABLISHMENT_DATA } from "../../config/consts";

/**
 * <b>INITIAL_STATE<b/> Estado inicial 
 */
const INITIAL_STATE = {
    list: {},
    selected: false,
    dataEstablishment: {},
    loading: false
   
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case type.ESTABLISHMENT_FETCHED:
            return {...state, list: action.payload.data.response.content.Resultado || INITIAL_STATE.list, loading: false, selected: false}
        case type.ESTABLISHMENT_LOAD: 
            return {...state, loading: action.payload, selected: false}
        case type.ESTABLISHMENT_SAVE:
            localStorage.setItem(ESTABLISHMENT_DATA, JSON.stringify(action.payload));
            return {...state, loading: false, selected: true}
        case type.ESTABLISHMENT_DISCARD:
            localStorage.removeItem(ESTABLISHMENT_DATA)
            return {...state, loading: false, selected: false}
        default:
            return {...state};
    }
}

