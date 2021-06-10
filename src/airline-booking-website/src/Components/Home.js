import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Airline Booking Website</h1>
      <p>Book a Flight Now</p>
      <Link to="/allFlights">
        <button>BOOK A FLIGHT</button>
      </Link>
      <Link to="/login">
        <button>LOGIN</button>
      </Link>
    </div>
  );
}
