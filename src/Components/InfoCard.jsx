import { Fab } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import { grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { removeCity } from "../Redux/Actions";

function InfoCard() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weather);
  const currentCity = useSelector((state) => state.location.currentCity);
  const handleRemoveCity = () => {
    dispatch(removeCity(currentCity));
  };
  return weather ? (
    <div>
      <h2>{weather.name}</h2>
      <Fab
        onClick={handleRemoveCity}
        style={{
          marginTop: 8,
          backgroundColor: grey[900],
        }}
        size="small"
        color="primary"
        aria-label="add"
      >
        {" "}
        <RemoveIcon />
      </Fab>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default InfoCard;
