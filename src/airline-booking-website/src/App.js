import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import AdminHome from "./Components/Admin/AdminHome";
import Login from "./Components/Admin/Login";
import AllFlights from "./Components/Client/AllFlights";
import BookFlight from "./Components/Client/BookFlight";
import * as AdminEntity from "./Components/Entities/AdminEntity";
import * as AirplaneEntity from "./Components/Entities/AirplaneEntity";
import * as FlightEntity from "./Components/Entities/FlightEntity";
import * as PilotEntity from "./Components/Entities/PilotEntity";

export default function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/adminHome" exact component={AdminHome} />

        <Route path="/allFlights" exact component={AllFlights} />
        <Route path="/bookFlight/:id" exact component={BookFlight} />

        <Route path="/admin" exact component={AdminEntity.default} />
        <Route path="/adminList" exact component={AdminEntity.List} />
        <Route path="/adminAdd" exact component={AdminEntity.Add} />
        <Route path="/adminUpdate/:id" exact component={AdminEntity.Update} />

        <Route path="/pilot" exact component={PilotEntity.default} />
        <Route path="/pilotList" exact component={PilotEntity.List} />
        <Route path="/pilotAdd" exact component={PilotEntity.Add} />
        <Route path="/pilotUpdate/:id" exact component={PilotEntity.Update} />

        <Route path="/airplane" exact component={AirplaneEntity.default} />
        <Route path="/airplaneList" exact component={AirplaneEntity.List} />
        <Route path="/airplaneAdd" exact component={AirplaneEntity.Add} />
        <Route
          path="/airplaneUpdate/:id"
          exact
          component={AirplaneEntity.Update}
        />

        <Route path="/flight" exact component={FlightEntity.default} />
        <Route path="/flightList" exact component={FlightEntity.List} />
        <Route path="/flightAdd" exact component={FlightEntity.Add} />
        <Route path="/flightUpdate/:id" exact component={FlightEntity.Update} />
      </Router>
    </>
  );
}
