import * as ActionTypes from './ActionTypes';

export const modalComentario = (state = { modalComentario: { view: false, usuario: '', nuevoComentario: '', rating: 3 } }, action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_MODAL_VIEW:
            state.modalComentario.view = !state.modalComentario.view;
            return { ...state };
        case ActionTypes.UPDATE_MODAL_COMENTARIO:
            if (action.payload.nombre == "usuario") {
                state.modalComentario.usuario = action.payload.value;
            }
            else if (action.payload.nombre == "comentario") {
                state.modalComentario.nuevoComentario = action.payload.value;
            }
            else if (action.payload.nombre == "rating") {
                state.modalComentario.rating = action.payload.value;
            }
            return { ...state }
        default:
            return state;
    }
};