import React, { useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import Axios from "axios";

export default function BookFlight() {
  const { id } = useParams();
  const history = useHistory();

  const [SIN, setSIN] = useState(0);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [seat, setSeat] = useState(0);

  const addBooking = () => {
    // adds client and ticket
    Axios.post("http://localhost:3001/addBooking", {
      SIN: SIN,
      first_name: first_name,
      last_name: last_name,
      address: address,
      phone_number: phone_number,
      email: email,
      flight_id: id,
      seat_number: seat,
    }).then(() => {
      history.push("/allFlights");
    });
  };

  return (
    <div>
      <h1>Book Flight {id}</h1>
      <h3>Enter Information</h3>
      <label>SIN:</label>
      <input
        type="number"
        onChange={(event) => {
          setSIN(event.target.value);
        }}
      />
      <label>First Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <label>Last Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <label>Address:</label>
      <input
        type="text"
        onChange={(event) => {
          setAddress(event.target.value);
        }}
      />
      <label>Phone Number (No Symbols):</label>
      <input
        type="text"
        onChange={(event) => {
          setPhoneNumber(event.target.value);
        }}
      />
      <label>Email: </label>
      <input
        type="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label>Seat Number: </label>
      <input
        type="number"
        onChange={(event) => {
          setSeat(event.target.value);
        }}
      />
      <button onClick={addBooking}>Book Flight</button>
    </div>
  );
}
