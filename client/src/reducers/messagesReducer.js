import { ADD_MESSAGE } from '../types'

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            return { ...state, [action.payload._id]: []}
            //..._.mapKeys(action.payload, '_id')
        default:
            return state
    }
}