import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            if (!state.favoritos.some(item => action.payload === item)){
                state.favoritos.push(action.payload)
            }
            return {...state, isLoading: false, errMess: null, excursionId: action.payload};
        default:
            return state;
    }
};