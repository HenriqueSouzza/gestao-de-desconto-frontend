//estado inicial
const INITIAL_STATE = { selected: '', visible: {} }

//Reducer responsável por evoluir o estado da tab(aba)
export default (state = INITIAL_STATE, action ) => {
    switch (action.type) {

        case 'TAB_SELECTED':
            return { ...state, selected: action.payload }
        case 'TAB_SHOWED':
            return { ...state, visible: action.payload }
        default:
            return state;
    }
}