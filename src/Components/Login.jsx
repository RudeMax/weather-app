import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { loginUser } from "../Redux/Actions";
import { useNavigate, Redirect } from "@reach/router";

function Login() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const currentUser = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(name));
    setName("");
    navigate("/app", { replace: true });
  };
  if (currentUser) {
    return <Redirect to="/app" noThrow />;
  }
  return (
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2736/2736717.png"
        className="App-logo"
        alt="logo"
      />
      <form onSubmit={(e) => handleSubmit(e)} className="login-form">
        <TextField
          value={name}
          onChange={(e) => handleChange(e)}
          label={"Name:"}
        />
        <Button
          style={{
            margin: 10,
            backgroundColor: grey[900],
          }}
          variant="contained"
          onClick={(e) => handleSubmit(e)}
        >
          Next
        </Button>
      </form>
    </div>
  );
}

export default Login;
