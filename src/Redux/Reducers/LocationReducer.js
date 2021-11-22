import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  ADD_CITY,
  SWITCH_CITY,
  SET_FAV_CITIES,
  ADD_CURRENT_CITY,
  REMOVE_CITY,
} from "../ActionTypes";

const initState = {
  countriesError: "",
  isFetchingCountries: false,
  countriesFetched: false,
  countries: [],
  citiesError: "",
  isFetchingCities: false,
  citiesFetched: false,
  cities: [],
  currentCity: "",
  favoriteCities: [],
};

const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        isFetchingCountries: true,
        countriesError: "",
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countriesFetched: true,
        isCountriesFetching: false,
        countries: action.payload.data,
      };
    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        isCountriesFetching: false,
        countriesError: action.error,
      };

    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        isFetchingCities: true,
        citiesError: "",
      };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        citiesFetched: true,
        isCitiesFetching: false,
        cities: action.payload.data,
      };
    case FETCH_CITIES_FAILURE:
      return {
        ...state,
        isCitiesFetching: false,
        citiesError: action.error,
      };

    case ADD_CITY:
      localStorage.setItem("city", action.payload);
      localStorage.setItem(
        "favoriteCities",
        JSON.stringify(
          Array.from(new Set([...state.favoriteCities, action.payload]))
        )
      );

      return {
        ...state,
        favoriteCities: Array.from(
          new Set([...state.favoriteCities, action.payload])
        ),
        currentCity: action.payload,
      };

    case ADD_CURRENT_CITY:
      return {
        ...state,
        currentCity: action.payload,
      };

    case SET_FAV_CITIES:
      return {
        ...state,
        favoriteCities: action.payload,
      };

    case SWITCH_CITY:
      localStorage.setItem("city", action.payload);
      return {
        ...state,
        currentCity: action.payload,
      };

    case REMOVE_CITY:
      localStorage.setItem(
        "favoriteCities",
        JSON.stringify(
          state.favoriteCities.filter((city) => city !== action.payload)
        )
      );
      localStorage.setItem(
        "city",
        state.favoriteCities.find((city) => city !== action.payload)
      );
      return {
        ...state,
        favoriteCities: state.favoriteCities.filter(
          (city) => city !== action.payload
        ),
        currentCity: state.favoriteCities.find(
          (city) => city !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default locationReducer;
