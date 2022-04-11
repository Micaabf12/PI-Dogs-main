import { ActionTypes } from '../constants';
import axios from 'axios';

//

export function getDogs() {
  //acción para traer todos los perros

  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/dogs');

    return dispatch({
      type: ActionTypes.GET_DOGS,
      payload: json.data,
    });
  };
}

// export function getDogs() {
//   return function(dispatch) {
//     return axios
//       .get('http://localhost:3001/dogs')
//       .then((response) => response)
//       .then((json) => {
//         dispatch({
//           type: ActionTypes.GET_DOGS,
//           payload: json.data});
//       })
//   };

export function getDogDetails(id) {
  //acicón para traer a los perros por id despues es en definitiva la que voy a usar para los detalles
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/dogs/${id}`);

    return dispatch({
      type: ActionTypes.DOG_DETAILS,
      payload: json.data,
    });
  };
}

// export function getDogDetails(id) {

//   return  function(dispatch) {

//     axios
//     .get(`http://localhost:3001/dogs/${id}`)
//     .then((response) => response)
//       .then((json) => { dispatch({
//         type: ActionTypes.DOG_DETAILS,
//         payload: json.data});
//     })
//   };
// };

export function getDogsByName(name) {
  // traigo el perro determinado que busco o un array vacio
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);

      return dispatch({
        type: ActionTypes.GET_DOGS_BY_NAME,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: ActionTypes.GET_DOGS_BY_NAME,
        payload: [],
      });
    }
  };
}

// export function getDogsByName(name) {
//   return function (dispatch) {
//     axios
//       .get(`http://localhost:3001/dogs?name=${name}`)
//       .then((response) => response)
//       .then((json) => {
//         dispatch({
//         type: ActionTypes.GET_DOGS_BY_NAME,
//         payload: json.data,
//       });
//       })
//      .catch(err=>dispatch({
//         type: ActionTypes.GET_DOGS_BY_NAME,
//        payload: [],
//       }))
//   };

export function getTemperaments() {
  //traigo los temperamentos del backend
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/temperament');
    return dispatch({
      type: ActionTypes.GET_TEMPERAMENTS,
      payload: json.data,
    });
  };
}

// export function getTemperaments() { //traigo los temperamentos del backend
//   return function (dispatch) {
//     axios
//     .get('http://localhost:3001/temperament')
//     .then((response) => response)
//       .then((json) => {
//         return dispatch({
//           type: ActionTypes.GET_TEMPERAMENTS,
//           payload: json.data,
//         });
//     })
//   };
// }

export function filterDogsByTemperament(payload) {
  //acciones para mandar a llamar el firltrado por temperamento
  return {
    type: ActionTypes.FILTER_BY_TEMPERAMENT,
    payload,
  };
}

export function filterDogsBySource(payload) {
  //acciones para mandar a llamar el filtrado por fuente, la especificidad de cada fuete esta dada en el reducer
  //por lo que manda el handle filter by source definido ahi
  return {
    type: ActionTypes.FILTER_DOGS_BY_SOURCE,
    payload,
  };
}

export function sortByName(payload) {
  //acciones para ordenar los perros por nombre
  //aca pasa algo similar al filtrado por fuete pero con los nombre,s la especificidad esta definida en las funciones del home
  return {
    type: ActionTypes.ORDER_BY_NAME,
    payload,
  };
}

export function sortByWeight(payload) {
  //acción para ordenar los perros por peso
  return {
    type: ActionTypes.ORDER_BY_WEIGHT,
    payload,
  };
}

export function postDog(payload) {
  //posteo hacia el backend, el payload son los parametros de posteo, nombre, peso temperamento, etc...
  console.log(payload);
  return async function (dispatch) {
    try {
      var json = await axios.post('http://localhost:3001/dog/', payload);
      console.log(json);

      return dispatch({
        type: ActionTypes.POST_DOG,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

// export function postDog(payload) { //posteo hacia el backend, el payload son los parametros de posteo, nombre, peso temperamento, etc...
//   console.log(payload);
//   return function (dispatch) {
//     try {
//       axios
//       .post('http://localhost:3001/dog/', payload)
//       .then((response) => response)
//         .then((json) => {
//         dispatch({
//           type: ActionTypes.POST_DOG,
//           payload: json.data,
//         });
//       })
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }