import * as ActionTypes from './ActionTypes';
import { baseUrldata } from '../comun/comun';

export const fetchComentarios = () => (dispatch) => {
    return fetch(baseUrldata + 'comentarios.json')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comentarios => dispatch(addComentarios(comentarios)))
    .catch(error => dispatch(comentariosFailed(error.message)));
};

export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
});

export const fetchExcursiones = () => (dispatch) => {

    dispatch(excursionesLoading());

    return fetch(baseUrldata + 'excursiones.json')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(excursiones => dispatch(addExcursiones(excursiones)))
    .catch(error => dispatch(excursionesFailed(error.message)));
};

export const patchSalidaExcursion = (idExcursion,salidaDatetime) => (dispatch) => {
    const body = {}
    body[idExcursion+"/siguienteSalida"] = salidaDatetime;
    return fetch(baseUrldata+'excursiones.json/', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        }).then(setTimeout(() => {
            dispatch(fetchExcursiones())
        }, 1000));
};

export const updateSiguienteSalida = (siguienteSalida) => ({
    type: ActionTypes.UPDATE_SIGUIENTE_SALIDA,
    payload: siguienteSalida
})

export const excursionesLoading = () => ({
    type: ActionTypes.EXCURSIONES_LOADING
});

export const excursionesFailed = (errmess) => ({
    type: ActionTypes.EXCURSIONES_FAILED,
    payload: errmess
});

export const addExcursiones = (excursiones) => ({
    type: ActionTypes.ADD_EXCURSIONES,
    payload: excursiones
});

export const fetchCabeceras = () => (dispatch) => {
    
    dispatch(cabecerasLoading());

    return fetch(baseUrldata + 'cabeceras.json')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(cabeceras => dispatch(addCabeceras(cabeceras)))
    .catch(error => dispatch(cabecerasFailed(error.message)));
};

export const cabecerasLoading = () => ({
    type: ActionTypes.CABECERAS_LOADING
});

export const cabecerasFailed = (errmess) => ({
    type: ActionTypes.CABECERAS_FAILED,
    payload: errmess
});

export const addCabeceras = (cabeceras) => ({
    type: ActionTypes.ADD_CABECERAS,
    payload: cabeceras
});

export const fetchActividades = () => (dispatch) => {
    
    dispatch(actividadesLoading());

    return fetch(baseUrldata + 'actividades.json')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(actividades => dispatch(addActividades(actividades)))
    .catch(error => dispatch(actividadesFailed(error.message)));
};

export const actividadesLoading = () => ({
    type: ActionTypes.ACTIVIDADES_LOADING
});

export const actividadesFailed = (errmess) => ({
    type: ActionTypes.ACTIVIDADES_FAILED,
    payload: errmess
});

export const addActividades = (actividades) => ({
    type: ActionTypes.ADD_ACTIVIDADES,
    payload: actividades
});

export const postFavorito = (excursionId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorito(excursionId));
    }, 500);
};
export const addFavorito = (excursionId) => ({
    type: ActionTypes.ADD_FAVORITO,
    payload: excursionId
});

export const updateModalView = () => (dispatch) => {
    dispatch(toggleModalView());
};

export const toggleModalView = () => ({
    type: ActionTypes.TOGGLE_MODAL_VIEW,
})

export const postModalComentario = (event) => (dispatch) => {
    dispatch(updateModalComentario(event));
};

export const updateModalComentario = (event) => ({
    type: ActionTypes.UPDATE_MODAL_COMENTARIO,
    payload: event
})

export const postComentario = (comentario) => (dispatch) => {

    fetch(baseUrldata+'comentarios.json', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comentario)
        }).then(setTimeout(() => {
            dispatch(fetchComentarios())
        }, 1000));

}

export const addComentario = (comentario) => ({
    type: ActionTypes.ADD_COMENTARIO,
    payload: comentario
});

export const fetchFotos = () => (dispatch) => {
    return fetch(baseUrldata + 'fotos.json')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(fotos => dispatch(addFotos(fotos)))
}

export const addFoto = (foto,id) => ({
    

    type: ActionTypes.ADD_FOTO,
    payload: {'uri':foto, 'id':id}
})

export const addFotos = (fotos) => ({
    type: ActionTypes.ADD_FOTOS,
    payload: fotos
})