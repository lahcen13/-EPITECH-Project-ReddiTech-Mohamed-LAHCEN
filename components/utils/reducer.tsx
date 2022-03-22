import { actionTypes, storeStateTypes } from "./types"

const reducer = (state: storeStateTypes, action: actionTypes) => {
    switch (action.type) {
        case 'SET_AUTH':
            state.isAuthenticated = action.value
            return {...state, isAuthenticated: action.value}
        default:
            throw 'unknown action'
    }
}

export default reducer
