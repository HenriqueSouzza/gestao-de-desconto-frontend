import type from './types';

import { ESTABLISHMENT_DATA } from "../../config/consts";


/**
 * <b>INITIAL_STATE<b/> Estado inicial 
 */
const INITIAL_STATE = {
    establishmentUser: [],
    branchUser: [],
    establishmentPeriod: [],
    courseType: [],
    modality: [{ value: "P", name: "Presencial" }, { value: "D", name: "Ensino à distância" }],
    list: [],
    selected: localStorage.getItem(ESTABLISHMENT_DATA) != undefined ? true : false,
    course: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case type.ESTABLISHMENT_LOAD:
            return { ...state, loading: action.payload }
        case type.ESTABLISHMENT_USER:
            return { ...state, establishmentUser: action.payload.data.response.content.Resultado || INITIAL_STATE.establishmentUser, loading: false }
        case type.ESTABLISHMENT_BRANCH_USER:
            return { ...state, branchUser: action.payload.data.response.content.Resultado || INITIAL_STATE.branchUser, loading: false }
        case type.ESTABLISHMENT_PERIOD:
            return { ...state, establishmentPeriod: action.payload ? action.payload.data.response.content : INITIAL_STATE.establishmentPeriod, loading: false }
        case type.ESTABLISHMENT_DISCARD:
            return { ...state, selected: action.payload }
        case type.ESTABLISHMENT_SAVE:
            localStorage.setItem(ESTABLISHMENT_DATA, JSON.stringify(action.payload));
            return { ...state, loading: false, selected: true }
        case type.ESTABLISHMENT_COURSE_TYPE:
            return { ...state, courseType:action.payload.data.response.content.Resultado, loading: false}
        case type.ESTABLISHMENT_COURSE_FETCHED:
            return { ...state, course: action.payload.data.response.content.Resultado || INITIAL_STATE.course, loading: false, selected: true }
        default:
            return { ...state };
    }
}

