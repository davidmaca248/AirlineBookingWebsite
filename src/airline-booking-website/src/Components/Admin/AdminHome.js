import { Link } from "react-router-dom";
import "../../App.css";

export default function AdminHome() {
  return (
    <div className="admin-container">
      <h1>Admin Home</h1>
      <Link to="/admin">
        <button className="btn btn-transparent btn-exLar">Admin</button>
      </Link>
      <Link to="/pilot">
        <button className="btn btn-transparent btn-exLar">Pilot</button>
      </Link>
      <Link to="/airplane">
        <button className="btn btn-transparent btn-exLar">Airplane</button>
      </Link>
      <Link to="/flight">
        <button className="btn btn-transparent btn-exLar">Flight</button>
      </Link>
    </div>
  );
}
