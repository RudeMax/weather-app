import "./App.css";
import ApplicationBody from "./Components/ApplicationBody";
import Login from "./Components/Login";
import { Router } from "@reach/router";
import CitySelect from "./Components/CitySelect";
import { addCurrentCity, setFavoriteCities } from "./Redux/Actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const currentCity = localStorage.getItem("city");
  const favoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));

  useEffect(() => {
    if (favoriteCities) {
      dispatch(setFavoriteCities(favoriteCities));
    }
  });

  useEffect(() => {
    if (currentCity) {
      dispatch(addCurrentCity(currentCity));
    }
  });

  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <ApplicationBody path="/app" />
        <CitySelect path="/city" />
      </Router>
    </div>
  );
}

export default App;
