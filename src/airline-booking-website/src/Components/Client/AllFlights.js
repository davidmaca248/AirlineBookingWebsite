import React, { useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import "../../App.css";

export default function AllFlights() {
  const [list, setList] = useState([]);

  /* get all flights */
  Axios.get("http://localhost:3001/flights").then((response) => {
    setList(response.data);
  });

  const history = useHistory();
  const routeChange = (id) => {
    let path = `/bookFlight/${id}`;
    history.push(path);
  };

  return (
    <div className="list">
      <h1>Flights</h1>
      {list.map((val, key) => {
        return (
          <div className="listElem">
            <div>
              <h3>Flight ID: {val.flight_id}</h3>
              <h3>Airplane ID: {val.airplane_id}</h3>
              <h3>Pilot ID: {val.pilot_id}</h3>
              <h3>Departure Airport: {val.departure_airport}</h3>
              <h3>Arrival Airport: {val.arrival_airport}</h3>
              <h3>Departure Time: {val.departure_time}</h3>
              <h3>Arrival Time: {val.arrival_time}</h3>
            </div>
            <div>
              <button
                className="btn btn-transparent btn-lar"
                onClick={() => {
                  routeChange(val.flight_id);
                }}
              >
                Book
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
