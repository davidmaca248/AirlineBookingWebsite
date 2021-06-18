import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Axios from "axios";

export default function AirplanePage() {
  return (
    <div className="admin-container">
      <h1>Airplanes</h1>
      <Link to="/airplaneList">
        <button className="btn btn-transparent btn-exLar">All Airplanes</button>
      </Link>
      <Link to="/airplaneAdd">
        <button className="btn btn-transparent btn-exLar">Add Airplane</button>
      </Link>
    </div>
  );
}

export function List() {
  const [list, setList] = useState([]);

  /* Populate list */
  Axios.get("http://localhost:3001/airplanes").then((response) => {
    setList(response.data);
  });

  const deleteAirplane = (id) => {
    Axios.delete(`http://localhost:3001/airplanes/${id}`).then((response) => {
      setList(
        list.filter((val) => {
          return val.airplane_id !== id;
        })
      );
    });
  };

  const history = useHistory();
  const routeChange = (id) => {
    let path = `/airplaneUpdate/${id}`;
    history.push(path);
  };

  return (
    <div className="list">
      <h1>Airplanes</h1>
      {list.map((val, key) => {
        return (
          <div key={val.airplane_id} className="listElem">
            <div>
              <h3>Airplane ID: {val.airplane_id}</h3>
              <h3>Airplane Type: {val.type}</h3>
              <h3>Pilot ID: {val.pilot_id}</h3>
              <h3>Airport ID: {val.airport_id}</h3>
              <h3>Departure Time: {val.departure_time}</h3>
              <h3>Arrival Time: {val.arrival_time}</h3>
            </div>
            <div>
              <button
                className="btn btn-transparent btn-med"
                onClick={() => {
                  routeChange(val.airplane_id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-transparent btn-med"
                onClick={() => {
                  deleteAirplane(val.airplane_id);
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
  const [type, setType] = useState("");
  const [pilot_id, setPilotID] = useState(1);
  const [airport_id, setAirportID] = useState(1);
  const [arrival_time, setArrivalTime] = useState("");
  const [departure_time, setDepartureTime] = useState("");

  const addAirplane = () => {
    Axios.post("http://localhost:3001/airplanes", {
      type: type,
      pilot_id: pilot_id,
      airport_id: airport_id,
      arrival_time: arrival_time,
      departure_time: departure_time,
    }).then((response) => {
      history.push("/airplaneList");
    });
  };

  return (
    <div className="admin-container">
      <h1>Add Airplane</h1>
      <label>Airplane Type: </label>
      <input
        type="text"
        onChange={(event) => {
          setType(event.target.value);
        }}
      />
      <label>Pilot ID: </label>
      <input
        type="number"
        onChange={(event) => {
          setPilotID(event.target.value);
        }}
      />
      <label>Airport ID: </label>
      <input
        type="number"
        onChange={(event) => {
          setAirportID(event.target.value);
        }}
      />
      <label>Departure Time (YYYY-MM-DD HH:MI:SS): </label>
      <input
        type="datetime"
        onChange={(event) => {
          setDepartureTime(event.target.value);
        }}
      />
      <label>Arrival Time (YYYY-MM-DD HH:MI:SS): </label>
      <input
        type="datetime"
        onChange={(event) => {
          setArrivalTime(event.target.value);
        }}
      />
      <button className="btn btn-opaque btn-med" onClick={addAirplane}>
        Add Airplane
      </button>
    </div>
  );
}

export function Update() {
  const { id } = useParams();
  const history = useHistory();

  const [airplane, setAirplane] = useState([]);

  const [newType, setNewType] = useState("");
  const [newPilot, setNewPilot] = useState(1);
  const [newAirport, setNewAirport] = useState(1);
  const [newDeparture_time, setNewDepartureTime] = useState("");
  const [newArrival_time, setNewArrivalTime] = useState("");

  /* get airplane */
  Axios.get("http://localhost:3001/airplanes/:id").then((response) => {
    setAirplane(response.data);
  });

  const editData = () => {
    Axios.put("http://localhost:3001/airplanes", {
      airplane_id: id,
      type: newType,
      pilot_id: newPilot,
      airport_id: newAirport,
      departure_time: newDeparture_time,
      arrival_time: newArrival_time,
    }).then((response) => {}, history.push("/airplaneList"));
  };

  return (
    <div>
      <h1>Edit Airplane {id}</h1>
      <label>Airplane Type: {airplane.type}</label>
      <input
        type="text"
        placeholder={airplane.type}
        onChange={(event) => {
          setNewType(event.target.value);
        }}
      />
      <label>Pilot ID: {airplane.pilot_id}</label>
      <input
        type="number"
        placeholder={airplane.pilot_id}
        onChange={(event) => {
          setNewPilot(event.target.value);
        }}
      />
      <label>Airport ID: {airplane.airport_id}</label>
      <input
        type="number"
        placeholder={airplane.airport_id}
        onChange={(event) => {
          setNewAirport(event.target.value);
        }}
      />
      <label>
        Departure Time (YYYY-MM-DD HH-MI-SS): {airplane.departure_time}
      </label>
      <input
        type="datetime"
        placeholder={airplane.departure_time}
        onChange={(event) => {
          setNewDepartureTime(event.target.value);
        }}
      />
      <label>Arrival Time (YYYY-MM-DD HH-MI-SS): {airplane.arrival_time}</label>
      <input
        type="datetime"
        placeholder={airplane.arrival_time}
        onChange={(event) => {
          setNewArrivalTime(event.target.value);
        }}
      />
      <button onClick={editData}>Edit Airplane</button>
    </div>
  );
}
