import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Blueberry Game
      </Link>

      <div className="nav-links" role="navigation" aria-label="Main">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>

        {!token && (
          <>
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </>
        )}
        <NavLink to="/about" className="nav-link">
          About Us
        </NavLink>
        {token && (
          <>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
