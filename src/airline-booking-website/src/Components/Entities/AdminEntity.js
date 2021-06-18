import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Axios from "axios";

export default function AdminPage() {
  return (
    <div className="admin-container">
      <h1>Admins</h1>
      <Link to="/adminList">
        <button className="btn btn-transparent btn-exLar">All Admins</button>
      </Link>
      <Link to="/adminAdd">
        <button className="btn btn-transparent btn-exLar">Add Admin</button>
      </Link>
    </div>
  );
}

export function List() {
  const [list, setList] = useState([]);

  /* Populate list */
  Axios.get("http://localhost:3001/admins").then((response) => {
    setList(response.data);
  });

  const deleteAdmin = (id) => {
    Axios.delete(`http://localhost:3001/admins/${id}`).then((response) => {
      // create new list without the deleted admin
      setList(
        list.filter((val) => {
          return val.admin_id !== id; // put into adminList if id thats deleted !== id
        })
      );
    });
  };

  const history = useHistory();
  const routeChange = (id) => {
    let path = `/adminUpdate/${id}`;
    history.push(path);
  };

  return (
    <div className="list">
      <h1>Admins</h1>
      {list.map((val, key) => {
        // for every element in the adminList
        return (
          //print out (map) every admin in the page
          <div className="listElem">
            <div>
              <h3>Admin ID: {val.admin_id}</h3>
              <h3>Username: {val.username}</h3>
              <h3>Airport ID: {val.airport_id}</h3>
            </div>
            <div>
              <button
                className="btn btn-transparent btn-med"
                onClick={() => {
                  routeChange(val.admin_id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-transparent btn-med"
                onClick={() => {
                  deleteAdmin(val.admin_id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Add() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [airport_id, setAirportID] = useState("");

  const addAdmin = () => {
    Axios.post("http://localhost:3001/admins", {
      username: username,
      password: password,
      airport_id: airport_id,
    }).then((response) => {
      history.push("/adminList");
    });
  };

  return (
    <div className="admin-container">
      <h1>Add Admin</h1>
      <label>Username: </label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <label>Airport ID: </label>
      <input
        type="number"
        onChange={(event) => {
          setAirportID(event.target.value);
        }}
      />
      <button className="btn btn-opaque btn-med" onClick={addAdmin}>
        Add Admin
      </button>
    </div>
  );
}

export function Update() {
  const { id } = useParams();
  const history = useHistory();

  const [admin, setAdmin] = useState([]);

  const [newUsername, setNewUsername] = useState("");
  const [newAirportID, setNewAirportID] = useState("");

  /* get admin */
  Axios.get("http://localhost:3001/admins/:id").then((response) => {
    setAdmin(response.data);
  });

  const editData = () => {
    Axios.put("http://localhost:3001/admins", {
      admin_id: id,
      username: newUsername,
      airport_id: newAirportID,
    }).then((response) => {}, history.push("/adminList"));
  };

  return (
    <div>
      <h1>Edit Admin {id} </h1>
      <label>Username: {admin.username}</label>
      <input
        type="text"
        placeholder={admin.username}
        onChange={(event) => {
          setNewUsername(event.target.value);
        }}
      />
      <label>Airport ID: {admin.airport_id}</label>
      <input
        type="number"
        placeholder={admin.airport_id}
        onChange={(event) => {
          setNewAirportID(event.target.value);
        }}
      />
      <button onClick={editData}>Edit Admin</button>
    </div>
  );
}
