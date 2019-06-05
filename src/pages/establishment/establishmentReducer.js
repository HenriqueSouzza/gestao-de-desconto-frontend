import type from './types';

import { ESTABLISHMENT_DATA } from "../../config/consts";

/**
 * <b>INITIAL_STATE<b/> Estado inicial 
 */
const INITIAL_STATE = {
    list: {},
    selected: false,
    course: {},
    period: {},
    dataEstablishment: {},
    dataEstablishmentUser: {} ,
    loading: false
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case type.ESTABLISHMENT_LOAD: 
            return {...state, loading: action.payload, selected: false}
        case type.ESTABLISHMENT_FETCHED:
            const dataLocalStorage =  JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))
            return {...state, list: action.payload.data.response.content.Resultado || INITIAL_STATE.list, loading: false, dataEstablishment: dataLocalStorage, selected: false}
        case type.ESTABLISHMENT_SAVE:
            localStorage.setItem(ESTABLISHMENT_DATA, JSON.stringify(action.payload));
            return {...state, loading: false, selected: true}
        case type.ESTABLISHMENT_DISCARD:
            localStorage.removeItem(ESTABLISHMENT_DATA)
            return {...state, loading: false, selected: false}
        case type.ESTABLISHMENT_COURSE_FETCHED:
            return{...state, course: action.payload.data.response.content.Resultado || INITIAL_STATE.course, loading: false, selected: true }
        case type.ESTABLISHMENT_PERIOD_FETCHED:
            return{...state, period: action.payload.data.response.content || INITIAL_STATE.period, loading: false, selected: false }
        case type.ESTABLISHMENT_USERS_SHOW:
            return { ...state, dataEstablishmentUser: action.payload.data.response.content.Resultado || INITIAL_STATE.period, loading: false, selected: false }
        case type.BRANCH_USERS_SHOW:            
            return { ...state, dataBranchUser: action.payload.data.response.content.Resultado || INITIAL_STATE.period, loading: false, selected: false }
        default:
            return {...state};
    }
}

