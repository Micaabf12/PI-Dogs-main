import { ActionTypes } from "../constants";

const initialState = {
  temperaments: []
};

export const temperamentsReducer = (state = initialState, {type, payload}) => {

  switch(type) {
    case ActionTypes.SET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload
      };
    default:
      return state;
  }
}