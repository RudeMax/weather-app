import { combineReducers } from "redux";
import locationReducer from "./LocationReducer";
import loginReducer from "./LoginReduser";
import weatherReducer from "./WeatherReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  location: locationReducer,
  weather: weatherReducer,
});

export default rootReducer;
