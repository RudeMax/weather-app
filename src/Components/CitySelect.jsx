import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchCities, fetchCountries, addCity } from "../Redux/Actions";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "@reach/router";

function CitySelect() {
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const countries = useSelector((state) =>
    state.location.countries.map((country) => ({
      label: country.name,
      flag: country.flag,
    }))
  );

  const cities = useSelector((state) =>
    state.location.cities.map((city) => ({
      label: city,
    }))
  );

  useEffect(() => {
    if (currentCountry) {
      dispatch(fetchCities(currentCountry.toLocaleLowerCase()));
    }
  }, [currentCountry, dispatch]);

  const handleCountryChange = (e, newValue) => {
    setCurrentCountry(newValue.label);
  };

  const handleCityChange = (e, newValue) => {
    setCurrentCity(newValue.label);
  };

  const clickHandler = () => {
    dispatch(addCity(currentCity));
    navigate("/app", { replace: true });
  };

  return (
    <div className="city-select">
      <p>Select your country:</p>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.label === value.label}
        onChange={(e, newValue) => handleCountryChange(e, newValue)}
        disablePortal
        id="combo-box-demo"
        options={countries}
        sx={{ width: 300 }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={option.flag}
              srcSet={option.flag}
              alt=""
            />
            {option.label}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <p>Select your City</p>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.label === value.label}
        onChange={(e, newValue) => handleCityChange(e, newValue)}
        disablePortal
        disabled={!currentCountry}
        id="combo-box-demo"
        options={cities}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
      <Button
        onClick={clickHandler}
        disabled={!currentCity}
        style={{
          margin: 20,
          color: grey[900],
          borderColor: grey[900],
        }}
        variant="outlined"
      >
        Next
      </Button>
    </div>
  );
}

export default CitySelect;
