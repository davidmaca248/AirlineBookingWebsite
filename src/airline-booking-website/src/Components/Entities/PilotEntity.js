import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Axios from "axios";

export default function PilotPage() {
  return (
    <div>
      <h1>Pilots</h1>
      <div>
        <Link to="/pilotList">
          <button>All Pilots</button>
        </Link>
        <Link to="/pilotAdd">
          <button>Add Pilot</button>
        </Link>
      </div>
    </div>
  );
}

export function List() {
  const [list, setList] = useState([]);

  /* Populate list*/
  Axios.get("http://localhost:3001/pilots").then((response) => {
    setList(response.data);
  });

  const deletePilot = (id) => {
    console.log("DELETE PILOT");
    Axios.delete(`http://localhost:3001/pilots/${id}`).then((response) => {
      setList(
        list.filter((val) => {
          return val.pilot_id !== id;
        })
      );
    });
  };

  const history = useHistory();
  const routeChange = (id) => {
    let path = `/pilotUpdate/${id}`;
    history.push(path);
  };

  return (
    <div className="list">
      <h1>Pilots</h1>
      {list.map((val, key) => {
        return (
          <div key={val.pilot_id} className="listInner">
            <div>
              <h3>Pilot ID: {val.pilot_id}</h3>
              <h3>First Name: {val.first_name}</h3>
              <h3>Last Name: {val.last_name}</h3>
            </div>
            <div>
              <button
                onClick={() => {
                  routeChange(val.pilot_id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deletePilot(val.pilot_id);
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
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const addPilot = () => {
    Axios.post("http://localhost:3001/pilots", {
      first_name: first_name,
      last_name: last_name,
    }).then((response) => {
      history.push("/pilotList");
    });
  };

  return (
    <div>
      <h1>Add Pilot</h1>
      <label>First Name: </label>
      <input
        type="text"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <label>Last Name: </label>
      <input
        type="text"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <button onClick={addPilot}>Add Pilot</button>
    </div>
  );
}

export function Update() {
  const { id } = useParams();
  const history = useHistory();

  const [pilot, setPilot] = useState([]);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  /* get pilot */
  Axios.get("http://localhost:3001/pilots/:id").then((response) => {
    setPilot(response.data);
  });

  const editData = () => {
    Axios.put("http://localhost:3001/pilots", {
      pilot_id: id,
      first_name: newFirstName,
      last_name: newLastName,
    }).then((response) => {}, history.push("/pilotList"));
  };

  return (
    <div>
      <h1>Edit Pilot {id}</h1>
      <label>First Name: {pilot.first_name}</label>
      <input
        type="text"
        placeholder={pilot.first_name}
        onChange={(event) => {
          setNewFirstName(event.target.value);
        }}
      />
      <label>Last Name: {pilot.last_name}</label>
      <input
        type="text"
        placeholder={pilot.last_name}
        onChange={(event) => {
          setNewLastName(event.target.value);
        }}
      />
      <button onClick={editData}>Edit Pilot</button>
    </div>
  );
}
