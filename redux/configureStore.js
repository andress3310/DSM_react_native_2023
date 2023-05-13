import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';
import { modalComentario } from './modal';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            modalComentario: modalComentario,
            excursiones: excursiones,
            comentarios: comentarios,
            cabeceras: cabeceras,
            actividades: actividades,
            favoritos: favoritos
        },
        middleware: [thunk],
    });

    return store;
}