import type from './types';
import { getListTransform, getDetailTransform } from '../../helpers/transformResponse';

/**
 * <b>INITIAL_STATE<b/> Estado inicial 
 */
const INITIAL_STATE = {
    typeStudent: [{ value: 'CALOURO', label: 'CALOURO' }, { value: 'VETERANO', label: 'VETERANO' }],
    list: [],
    loading: false,
    scholarship: [],
    selectRaForm: [],
    scholarshipSelectedForm: [],
    validation: [],
    valueForm: [],
    profit: [],
    /** Parametros que foram selecionados no formulario (studentDiscountsForm.jsx)*/
    paramsFormSelected: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case type.STUDENT_DISCOUNTS_LOAD:
            return { ...state, loading: action.payload };
            
        case type.STUDENT_DISCOUNT_RESET_REDUCER:
            return INITIAL_STATE;

        case type.STUDENT_DISCOUNTS_FETCHED:
            return { ...state, list: getListTransform(action.payload.response.data) || INITIAL_STATE.list, paramsFormSelected: action.payload.params, loading: false }

        case type.STUDENT_DISCOUNTS_SCHOLARSHIP_FETCHED:
            return { ...state, scholarship: action.payload.data.response.content || INITIAL_STATE.list }

        case type.STUDENT_DISCOUNTS_PARAMS:
            return { ...state, 
                valueForm: action.payload.discountModel, 
                scholarshipSelectedForm: action.payload.arrayScholarshipSelected, 
                validation: action.payload.validationInputAndSelect,
                selectRaForm: action.payload.arrayCheckbox
            }

        case type.STUDENT_DISCOUNTS_INPUT_VALUE:
            if(action.payload.selectRaForm){
                return {...state, selectRaForm: [...action.payload.selectRaForm]}
            }else if(action.payload.scholarshipSelectedForm){
                return {...state, scholarshipSelectedForm: [...action.payload.scholarshipSelectedForm]}
            }else if(action.payload.validation){
                return {...state, validation: [...action.payload.validation]}
            }else if(action.payload.valueForm){
                return {...state, valueForm: [...action.payload.valueForm]}
            }else{
                return {...state}
            }

        // case type.STUDENT_DISCOUNTS_LOCAL_FETCHED:
        //     return {...state, list: getListTransform(action.payload.response.data)}




        /********************************** REFATORAR ***************************************/

        // case type.STUDENT_DISCOUNTS_SET_FORM:
        //     return { ...state, discounts: action.payload || INITIAL_STATE.list }

        // case type.STUDENT_DISCOUNTS_SAVE_VALUE_INPUT:
        //     return { ...state, valueForm: action.payload || INITIAL_STATE.list }

        // case type.STUDENT_DISCOUNTS_SAVE_CHECKED_FORM:
        //     return { ...state, selectRaForm: action.payload || INITIAL_STATE.list }

        // case type.STUDENT_DISCOUNTS_SAVE_SCHOLARSHIP_FORM:
        //     return { ...state, scholarshipSelectedForm: action.payload || INITIAL_STATE.list }

        // case type.STUDENT_DISCOUNTS_SAVE_VALIDATION_FORM:
        //     return { ...state, validation: action.payload || INITIAL_STATE.list }

        /************************************************************************************/


        case type.STUDENT_DISCOUNTS_GET_PROFIT:
            return { ...state, profit: getListTransform(action.payload.data) || INITIAL_STATE.list }

        default:
            return state;

    }
}