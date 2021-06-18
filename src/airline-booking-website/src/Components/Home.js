import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Airline Booking Website</h1>
      <p>Book a Flight Now</p>
      <div className="home-btns">
        <Link to="/allFlights">
          <button className="btn btn-transparent btn-lar">BOOK A FLIGHT</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-opaque btn-lar">LOGIN</button>
        </Link>
      </div>
    </div>
  );
}
