import { SIGN_IN, SIGN_OUT } from '../types'

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    imageUrl: null,
    username: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload.userId, imageUrl: action.payload.imageUrl, username: action.payload.username}
        case SIGN_OUT:
            return { ...state, isSignedIn: false }
        default:
            return state;
    }
}