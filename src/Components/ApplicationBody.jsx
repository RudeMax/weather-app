import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "@reach/router";
import Weather from "./Weather";
import WeatherCard from "./WeatherCard";
import InfoCard from "./InfoCard";

function ApplicationBody() {
  const user = useSelector((state) => state.login.currentUser);
  const currentCity = useSelector((store) => store.location.currentCity);

  const navigate = useNavigate();
  const handleAddCity = () => {
    navigate("/city", { replace: true });
  };
  return (
    <div className="application-body">
      {currentCity ? (
        <div className="application-main">
          <Weather />
          <InfoCard />
          <WeatherCard />
        </div>
      ) : (
        <div>
          <p>Hello {user}!</p>{" "}
          <Button onClick={handleAddCity}>Chose your city</Button>
        </div>
      )}
    </div>
  );
}

export default ApplicationBody;
