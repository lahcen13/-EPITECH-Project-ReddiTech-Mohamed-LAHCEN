import { actionTypes } from "./types"

const setTrueAction: actionTypes = {
    type: 'SET_AUTH',
    value: true
}

const setFalseAction: actionTypes = {
    type: 'SET_AUTH',
    value: false
}

export {
    setTrueAction,
    setFalseAction
}