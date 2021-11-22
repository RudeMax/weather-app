import { Autocomplete, Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, switchCity } from "../Redux/Actions";
import { useNavigate } from "@reach/router";

function Weather() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cities = useSelector((state) =>
    state.location.favoriteCities.map((city) => ({ label: city }))
  );

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("city");
    localStorage.removeItem("favoriteCities");
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };
  const handleAddCity = () => {
    navigate("/city", { replace: true });
  };

  const handleCitySwitch = (e, newValue) => {
    dispatch(switchCity(newValue.label));
  };

  return (
    <div>
      <div className="weather-header">
        <Button
          onClick={handleLogout}
          style={{
            backgroundColor: grey[900],
            color: grey[100],
          }}
          size="small"
        >
          leave
        </Button>
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.label === value.label}
          onChange={(e, newValue) => handleCitySwitch(e, newValue)}
          disablePortal
          id="combo-box-demo"
          options={cities}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
        <Fab
          onClick={handleAddCity}
          style={{
            marginTop: 8,
            backgroundColor: grey[900],
          }}
          size="small"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </div>
      <div className="weather-info"></div>
      <div className="weater-card"></div>
    </div>
  );
}

export default Weather;
