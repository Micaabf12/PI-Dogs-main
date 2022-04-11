import { ActionTypes } from '../constants';

const initialState = {
  dogs: [],
  allDogs: [],
  dogsByName: [],
  dogsByWeight: [],
  temperaments: [],
  dogDetails: [],
  temperamentsSelected: [],
};

function rootReducer(state = initialState, action) {
  const allDogs = state.allDogs;

  switch (action.type) {
    case ActionTypes.GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload, //traigo 2 veces los perros para luego en el home poder hacer mas sencillo el "loading..."
      };
    case ActionTypes.DOG_DETAILS:
      return {
        ...state,
        dogDetails: action.payload,
      };
    case ActionTypes.GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case ActionTypes.GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case ActionTypes.POST_DOG:
      return state;
    case ActionTypes.FILTER_BY_TEMPERAMENT:
      if (action.payload === 'all') {
        return {
          ...state,
          dogs: allDogs,
        };
      }
      //genero un array auxiliar donde pongo los perros que tienen temperamento
      const filteredDogs = allDogs.filter((dog) => dog.temperament?.includes(action.payload));

      return {
        ...state,
        dogs: filteredDogs,
      };
    case ActionTypes.FILTER_DOGS_BY_SOURCE: //estos redurcer se van a disparar con el handle filter by source
      if (action.payload === 'onlyFromDb') {
        const dogsCreated = allDogs.filter((dog) => dog.created_in_db); //un array que identifica a los creados en DB porque le creee este atributo en el modal para que de true

        return {
          ...state,
          dogs: dogsCreated,
        };
      }
      if (action.payload === 'onlyFromApi') {
        const dogsFromApi = allDogs.filter((dog) => !dog.created_in_db); //aca por el contrario los creados por api no tienen esta caractristica

        return {
          ...state,
          dogs: dogsFromApi,
        };
      }
      return {
        //aca le doy un default
        ...state,
        dogs: allDogs,
      };
    case ActionTypes.ORDER_BY_NAME:
      if (action.payload === 'nameAscendant') {
        const dogsAscendantByName = state.dogs.sort((a, b) => {
          //hacemos un sort para el orden
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });

        return {
          ...state,
          dogs: dogsAscendantByName,
        };
      }
      if (action.payload === 'nameDescendant') {
        const dogsDescendantByName = state.dogs.sort((a, b) => {
          //hacemos un sort para el orden
          if (a.name < b.name) return 1;
          if (b.name < a.name) return -1;
          return 0;
        });

        return {
          ...state,
          dogs: dogsDescendantByName,
        };
      }
      return {
        ...state,
        dogs: allDogs,
      };
    case ActionTypes.ORDER_BY_WEIGHT:
      if (action.payload === 'weightAscendant') {
        const dogsAscendantByWeight = state.dogs.sort((a, b) => {
          if (a.avgWeight > b.avgWeight) return 1; //aca utilizamos la propiedad de peso promedio que hicimos en el backend cuando filtramos
          if (b.avgWeight > a.avgWeight) return -1; //hacemos un sort para ordenar
          return 0;
        });

        return {
          ...state,
          dogs: dogsAscendantByWeight,
        };
      }
      if (action.payload === 'weightDescendant') {
        const dogsDescendantByWeight = state.dogs.sort((a, b) => {
          if (a.avgWeight < b.avgWeight) return 1;
          if (b.avgWeight < a.avgWeight) return -1;
          return 0;
        });

        return {
          ...state,
          dogs: dogsDescendantByWeight,
        };
      }
      return {
        ...state,
        dogs: allDogs, //creamos un default
      };
    default:
      return state;
  }
}

export default rootReducer;
