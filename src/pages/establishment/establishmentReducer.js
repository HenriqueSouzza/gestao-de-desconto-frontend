import type from './types';

import { ESTABLISHMENT_DATA } from "../../config/consts";

/**
 * <b>INITIAL_STATE<b/> Estado inicial 
 */
const INITIAL_STATE = {
    establishmentUser: [],
    branchUser: [],
    establishmentPeriod: [],
    modality: [
        {
            value: "P",
            name: "Presencial"
        },
        {
            value: "D",
            name: "Ensino à distância"
        }
    ],
    
    list: [],
    selected: false,
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


        /**************************************  DESCARTAR  *******************************************************/
        case type.ESTABLISHMENT_FETCHED:
            const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))
            return { ...state, list: action.payload.data.response.content.Resultado || INITIAL_STATE.list, loading: false, dataEstablishment: dataLocalStorage, }
        case type.ESTABLISHMENT_SAVE:
            localStorage.setItem(ESTABLISHMENT_DATA, JSON.stringify(action.payload));
            return { ...state, loading: false, selected: true }
        case type.ESTABLISHMENT_DISCARD:
            localStorage.removeItem(ESTABLISHMENT_DATA)
            return { ...state, loading: false, selected: false }
        case type.ESTABLISHMENT_COURSE_FETCHED:
            return { ...state, course: action.payload.data.response.content.Resultado || INITIAL_STATE.course, loading: false, selected: true }
        default:
            return { ...state };
    }
}

