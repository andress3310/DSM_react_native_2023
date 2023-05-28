import * as ActionTypes from './ActionTypes';

export const siguienteSalida = (state = { siguienteSalida: new Date() }, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_SIGUIENTE_SALIDA:
            state.siguienteSalida = action.payload;
            return { ...state }
        default:
            return state;
    }
};