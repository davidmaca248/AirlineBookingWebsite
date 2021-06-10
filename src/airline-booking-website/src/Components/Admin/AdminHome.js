import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div>
      <h1>Admin Home</h1>
      <div>
        <ul>
          <li>
            <Link to="/admin">
              <button>Admin</button>
            </Link>
          </li>
          <li>
            <Link to="/pilot">
              <button>Pilot</button>
            </Link>
          </li>
          <li>
            <Link to="/airplane">
              <button>Airplane</button>
            </Link>
          </li>
          <li>
            <Link to="/flight">
              <button>Flight</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
