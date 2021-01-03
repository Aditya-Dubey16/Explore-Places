import * as ActionTypes from './ActionTypes';

export const Likes = (state = {
        errMess: null,
        likes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_LIKE:
            return {...state, errMess: null, likes:  action.payload};

        case ActionTypes.LIKE_FAILED:
            return {...state, errMess: action.payload, likes: null};

        default:
            return state;
    }
}
