import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Axios from "axios";

export default function FlightPage() {
  return (
    <div className="admin-container">
      <h1>Flights</h1>
      <Link to="/flightList">
        <button className="btn btn-transparent btn-exLar">All Flights</button>
      </Link>
      <Link to="/flightAdd">
        <button className="btn btn-transparent btn-exLar">Add Flight</button>
      </Link>
    </div>
  );
}

export function List() {
  const [list, setList] = useState([]);

  /* Populate list */
  Axios.get("http://localhost:3001/flights").then((response) => {
    setList(response.data);
  });

  const deleteFlight = (id) => {
    Axios.delete(`http://localhost:3001/flights/${id}`).then((response) => {
      setList(
        list.filter((val) => {
          return val.flight_id !== id;
        })
      );
    });
  };

  const history = useHistory();
  const routeChange = (id) => {
    let path = `/flightUpdate/${id}`;
    history.push(path);
  };

  return (
    <div className="list">
      <h1>Flights</h1>
      {list.map((val, key) => {
        return (
          <div key={val.flight_id} className="listElem">
            <div>
              <h3>Flight ID: {val.flight_id}</h3>
              <h3>Pilot ID: {val.pilot_id}</h3>
              <h3>Airplane ID: {val.airplane_id}</h3>
              <h3>Departure Airport: {val.departure_airport}</h3>
              <h3>Arrival Airport: {val.arrival_airport}</h3>
              <h3>Departure Time: {val.departure_time}</h3>
              <h3>Arrival Time: {val.arrival_time}</h3>
            </div>
            <div>
              <button
                className="btn btn-transparent btn-med"
                onClick={() => {
                  routeChange(val.flight_id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-transparent btn-med"
                onClick={() => {
                  deleteFlight(val.flight_id);
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
  const [pilot_id, setPilotID] = useState(1);
  const [departure_airport, setDepartureAirport] = useState(1);
  const [arrival_airport, setArrivalAirport] = useState(1);
  const [departure_time, setDepartureTime] = useState("");
  const [arrival_time, setArrivalTime] = useState("");
  const [airplane_id, setAirplaneID] = useState(0);

  const addFlight = () => {
    Axios.post("http://localhost:3001/flights", {
      pilot_id: pilot_id,
      departure_airport: departure_airport,
      arrival_airport: arrival_airport,
      departure_time: departure_time,
      arrival_time: arrival_time,
      airplane_id: airplane_id,
    }).then((response) => {
      history.push("/flightList");
    });
  };

  return (
    <div className="admin-container">
      <h1>Add Flight</h1>
      <label>Pilot:</label>
      <input
        type="number"
        onChange={(event) => {
          setPilotID(event.target.value);
        }}
      />
      <label>Departure Airport:</label>
      <input
        type="number"
        onChange={(event) => {
          setDepartureAirport(event.target.value);
        }}
      />
      <label>Arrival Airport:</label>
      <input
        type="number"
        onChange={(event) => {
          setArrivalAirport(event.target.value);
        }}
      />
      <label>Departure Time (YYYY-MM-DD HH:MM:SS):</label>
      <input
        type="datetime"
        onChange={(event) => {
          setDepartureTime(event.target.value);
        }}
      />
      <label>Arrival Time (YYYY-MM-DD HH:MM:SS):</label>
      <input
        type="datetime"
        onChange={(event) => {
          setArrivalTime(event.target.value);
        }}
      />
      <label>Airplane ID:</label>
      <input
        type="number"
        onChange={(event) => {
          setAirplaneID(event.target.value);
        }}
      />
      <button className="btn btn-opaque btn-med" onClick={addFlight}>
        Add Flight
      </button>
    </div>
  );
}

export function Update() {
  const { id } = useParams();
  const history = useHistory();

  const [flight, setFlight] = useState([]);

  const [newPilot, setNewPilot] = useState(1);
  const [newDeparture_airport, setNewDepartureAirport] = useState("");
  const [newArrival_airport, setNewArrivalAirport] = useState("");
  const [newArrival_time, setNewArrivalTime] = useState("");
  const [newDeparture_time, setNewDepartureTime] = useState("");
  const [newAirplane, setNewAirplane] = useState(0);

  /* get flight */
  Axios.get("http://localhost:3001/flights/:id").then((response) => {
    setFlight(response.data);
  });

  const editData = () => {
    Axios.put("http://localhost:3001/flights", {
      flight_id: id,
      pilot_id: newPilot,
      departure_airport: newDeparture_airport,
      arrival_airport: newArrival_airport,
      departure_time: newDeparture_time,
      arrival_time: newArrival_time,
      airplane_id: newAirplane,
    }).then((response) => {}, history.push("/flightList"));
  };

  return (
    <div>
      <h1>Edit Flight {id}</h1>
      <label>Pilot ID: {flight.pilot_id}</label>
      <input
        type="number"
        placeholder={flight.pilot_id}
        onChange={(event) => {
          setNewPilot(event.target.value);
        }}
      />
      <label>Airplane ID: {flight.airplane_id}</label>
      <input
        type="number"
        placeholder={flight.airplane_id}
        onChange={(event) => {
          setNewAirplane(event.target.value);
        }}
      />
      <label>Departure Airport: {flight.departure_airport}</label>
      <input
        type="text"
        placeholder={flight.departure_airport}
        onChange={(event) => {
          setNewDepartureAirport(event.target.value);
        }}
      />
      <label>Arrival Airport: {flight.arrival_airport}</label>
      <input
        type="text"
        placeholder={flight.arrival_airport}
        onChange={(event) => {
          setNewArrivalAirport(event.target.value);
        }}
      />
      <label>
        Departure Time (YYYY-MM-DD HH-MI-SS): {flight.departure_time}
      </label>
      <input
        type="datetime"
        placeholder={flight.departure_time}
        onChange={(event) => {
          setNewDepartureTime(event.target.value);
        }}
      />
      <label>Arrival Time (YYYY-MM-DD HH-MI-SS): {flight.arrival_time}</label>
      <input
        type="datetime"
        placeholder={flight.arrival_time}
        onChange={(event) => {
          setNewArrivalTime(event.target.value);
        }}
      />
      <button onClick={editData}>Edit Flight</button>
    </div>
  );
}
