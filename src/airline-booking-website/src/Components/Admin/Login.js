import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Axios from "axios";

export default function Login() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.status != 1) {
        history.push("/adminHome");
      } else {
        setLoginMsg("Invalid username/password");
      }
    });
  };

  return (
    <div className="admin-container">
      <h1>Admin Login</h1>
      <input
        type="text"
        placeholder="Username..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className="btn btn-opaque btn-med" onClick={login}>
        Login
      </button>
      <p>{loginMsg}</p>
    </div>
  );
}
