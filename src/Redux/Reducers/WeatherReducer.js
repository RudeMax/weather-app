import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from "../ActionTypes";

const initState = {
  weather: null,
  isWeatherFetching: false,
  weatherFetched: false,
  weatherError: "",
};

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        isWeatherFetching: true,
        weatherError: "",
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weatherFetched: true,
        isWeatherFetching: false,
        weather: action.payload,
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        isWeatherFetching: false,
        weatherError: action.error,
      };

    default:
      return state;
  }
};

export default weatherReducer;
