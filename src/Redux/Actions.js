import Axios from "axios";
import {
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  ADD_CITY,
  ADD_CURRENT_CITY,
  SWITCH_CITY,
  SET_FAV_CITIES,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  REMOVE_CITY,
} from "./ActionTypes";

export const loginUser = (name) => {
  return {
    type: LOGIN_USER,
    payload: name,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const addCity = (data) => {
  return {
    type: ADD_CITY,
    payload: data,
  };
};

export const removeCity = (data) => {
  return {
    type: REMOVE_CITY,
    payload: data,
  };
};

export const addCurrentCity = (data) => {
  return {
    type: ADD_CURRENT_CITY,
    payload: data,
  };
};

export const setFavoriteCities = (data) => {
  return {
    type: SET_FAV_CITIES,
    payload: data,
  };
};

export const switchCity = (data) => {
  return {
    type: SWITCH_CITY,
    payload: data,
  };
};

export const fetchCountries = () => async (dispatch) => {
  dispatch({ type: FETCH_COUNTRIES_REQUEST });

  try {
    const response = await Axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    dispatch({ type: FETCH_COUNTRIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_COUNTRIES_FAILURE, error: error.message });
  }
};

export const fetchCities = (country) => async (dispatch) => {
  dispatch({ type: FETCH_CITIES_REQUEST });

  try {
    const response = await Axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",

      {
        country,
      }
    );
    dispatch({ type: FETCH_CITIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CITIES_FAILURE, error: error.message });
  }
};

export const fetchWeather = (data) => async (dispatch) => {
  dispatch({ type: FETCH_WEATHER_REQUEST });

  try {
    const response = await Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&appid=${data.key}`
    );
    dispatch({ type: FETCH_WEATHER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_WEATHER_FAILURE, error: error.message });
  }
};
