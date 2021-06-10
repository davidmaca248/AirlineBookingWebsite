const express = require("express");
const app = express(); // server app that listens to port 3001
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json()); // lets frontend and backend communicate
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "dmaca962",
  database: "airlineBooking",
});
app.listen(3001, () => {
  // since client sends to port 3001, listen to it
  console.log("Server is running on port 3001");
});

/* QUERIES ********************************************************************/

// Login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM admin WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      // error check
      if (err) {
        res.send({ err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ status: 1 }); // login failed
      }
    }
  );
});

/* AIRPORT ********************************************************************/

// All Airports
app.get("/airports", (req, res) => {
  db.query("SELECT * FROM airport", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* ADMIN ********************************************************************/

// All admins
app.get("/admins", (req, res) => {
  db.query("SELECT * FROM admin", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Specific Admin
app.get("/admins/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM admin WHERE admin_id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Add Admins
app.post("/admins", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const airport_id = req.body.airport_id;

  db.query(
    "INSERT INTO admin (username, password, airport_id) VALUES (?,?,?)",
    [username, password, airport_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Update Admin
app.put("/admins", (req, res) => {
  const admin_id = req.body.admin_id;
  const username = req.body.username;
  const airport_id = req.body.airport_id;

  db.query(
    "UPDATE admin SET username = ?, airport_id = ? WHERE admin_id = ?",
    [username, airport_id, admin_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Delete Admin
app.delete("/admins/:id", (req, res) => {
  const admin_id = req.params.id;

  db.query("DELETE FROM admin WHERE admin_id = ?", admin_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* PILOT ********************************************************************/

// All Pilots
app.get("/pilots", (req, res) => {
  db.query("SELECT * FROM pilot", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Specific Pilot
app.get("/pilots/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM pilot WHERE pilot_id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Add Pilot
app.post("/pilots", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  db.query(
    "INSERT INTO pilot (first_name,last_name) VALUES (?,?)",
    [first_name, last_name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Update Pilot
app.put("/pilots", (req, res) => {
  const pilot_id = req.body.pilot_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  db.query(
    "UPDATE pilot SET first_name = ?, last_name = ? WHERE pilot_id = ?",
    [first_name, last_name, pilot_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Delete Pilot
app.delete("/pilots/:id", (req, res) => {
  const pilot_id = req.params.id;

  // make airplane's pilot ID null
  db.query(
    "UPDATE airplane SET pilot_id = NULL WHERE pilot_id = ?",
    [pilot_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  // all flights with the pilot will become null
  db.query(
    "UPDATE flight SET pilot_id = NULL WHERE pilot_id = ?",
    [pilot_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  // delete pilot
  db.query("DELETE FROM pilot WHERE pilot_id = ?", pilot_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* AIRPLANE ********************************************************************/

// All Airplanes
app.get("/airplanes", (req, res) => {
  db.query("SELECT * FROM airplane", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Specific Airplane
app.get("/airplanes/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM airplane WHERE airplane_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Add Airplane
app.post("/airplanes", (req, res) => {
  const type = req.body.type;
  const pilot_id = req.body.pilot_id;
  const airport_id = req.body.airport_id;
  const departure_time = req.body.departure_time;
  const arrival_time = req.body.arrival_time;

  db.query(
    "INSERT INTO airplane (type,pilot_id,airport_id,departure_time,arrival_time) VALUES (?,?,?,?,?)",
    [type, pilot_id, airport_id, departure_time, arrival_time],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Update Airplane
app.put("/airplanes", (req, res) => {
  const airplane_id = req.body.airplane_id;
  const type = req.body.type;
  const pilot_id = req.body.pilot_id;
  const airport_id = req.body.airport_id;
  const departure_time = req.body.departure_time;
  const arrival_time = req.body.arrival_time;

  // update airplane
  console.log("Updated Airplane: " + airplane_id);
  db.query(
    "UPDATE airplane SET type = ?, pilot_id = ?, airport_id = ?, departure_time = ?, arrival_time = ? WHERE airplane_id = ?",
    [type, pilot_id, airport_id, departure_time, arrival_time, airplane_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Delete Airplane
app.delete("/airplanes/:id", (req, res) => {
  const airplane_id = req.params.id;

  // make flight's airplane ID null
  console.log("Updated flight's AirplaneID: " + airplane_id);
  db.query(
    "UPDATE flight SET airplane_id = NULL WHERE airplane_id = ?",
    [airplane_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  // delete airplane
  db.query(
    "DELETE FROM airplane WHERE airplane_id = ?",
    airplane_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* FLIGHTS ********************************************************************/

// All Flights
app.get("/flights", (req, res) => {
  db.query("SELECT * FROM flight", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Specific Flight
app.get("/flights/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM flight WHERE flight_id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Add Flights
app.post("/flights", (req, res) => {
  const pilot_id = req.body.pilot_id;
  const departure_airport = req.body.departure_airport;
  const arrival_airport = req.body.arrival_airport;
  const departure_time = req.body.departure_time;
  const arrival_time = req.body.arrival_time;
  const airplane_id = req.body.airplane_id;

  console.log("Flight Added");
  db.query(
    "INSERT INTO flight (pilot_id,departure_airport,arrival_airport,departure_time,arrival_time,airplane_id) VALUES (?,?,?,?,?,?)",
    [
      pilot_id,
      departure_airport,
      arrival_airport,
      departure_time,
      arrival_time,
      airplane_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Update Flight
app.put("/flights", (req, res) => {
  const flight_id = req.body.flight_id;
  const pilot_id = req.body.pilot_id;
  const departure_airport = req.body.departure_airport;
  const arrival_airport = req.body.arrival_airport;
  const departure_time = req.body.departure_time;
  const arrival_time = req.body.arrival_time;
  const airplane_id = req.body.airplane_id;

  db.query(
    "UPDATE flight SET pilot_id = ?, departure_airport = ?, arrival_airport = ?, departure_time = ?, arrival_time = ?, airplane_id = ? WHERE flight_id = ?",
    [
      pilot_id,
      departure_airport,
      arrival_airport,
      departure_time,
      arrival_time,
      airplane_id,
      flight_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Delete Flight
app.delete("/flights/:id", (req, res) => {
  const id = req.params.id;

  // delete all flight tickets first
  console.log("Deleted Flight Ticket: " + id);
  db.query(
    "DELETE FROM flight_ticket WHERE flight_id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  // delete flight
  db.query("DELETE FROM flight WHERE flight_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* TICKET ********************************************************************/
// Client and Ticket

// Add Ticket
app.post("/addBooking", (req, res) => {
  const SIN = req.body.SIN;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const address = req.body.address;
  const phone_number = req.body.phone_number;
  const email = req.body.email;
  const flight_id = req.body.flight_id;
  const seat_number = req.body.seat_number;

  // add Client
  db.query(
    "INSERT INTO client (SIN, first_name, last_name,address,phone_number,email) VALUES (?,?,?,?,?,?)",
    [SIN, first_name, last_name, address, phone_number, email],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  // add Ticket
  db.query(
    "INSERT INTO flight_ticket (seat_number, flight_id, SIN) VALUES (?,?,?)",
    [seat_number, flight_id, SIN],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
      console.log("TICKET ADDED");
    }
  );
});
