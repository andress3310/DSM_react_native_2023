import * as ActionTypes from './ActionTypes';

export const fotos = (state = {
    fotos: []
}, action) => {
    switch (action.type) {
    case ActionTypes.ADD_FOTOS:
        return {...state, fotos: Object.values(action.payload)};
    case ActionTypes.ADD_FOTO:
        action.payload.id = state.fotos.length;
        state.fotos.push(action.payload);
        return {...state}
        default:
            return state;
    }
};