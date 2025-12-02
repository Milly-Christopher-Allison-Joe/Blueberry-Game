import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout, user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <nav className="navbar">
      <Link to="/home" className="brand">
        Blueberry Game
      </Link>

      <div className="nav-links" role="navigation" aria-label="Main">
        <NavLink to="/" end className="nav-link">
          {/* Home icon */}
          <svg
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
          >
            <path
              d="M10 22 L24 9 L38 22 V38 H28 V28 H20 V38 H10 Z"
              fill="none"
              stroke="#d19bff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>

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

        {!token && (
          <div className="profile-menu">
            <div className="profile-icon">
              {/* profile icon */}
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
              >
                <circle
                  cx="24"
                  cy="18"
                  r="7"
                  fill="none"
                  stroke="#d19bff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 37
                     C13 30, 19 26, 24 26
                     C29 26, 35 30, 36 37"
                  fill="none"
                  stroke="#d19bff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* cute little dropdown menu for login/register/profile */}
            <div className="profile-dropdown">
              <NavLink to="/login" className="dropdown-link">
                Login
              </NavLink>
              <NavLink to="/register" className="dropdown-link">
                Register
              </NavLink>

              {/* profile link only shows if logged in */}
              {isLoggedIn && (
                <NavLink to="/profile" className="dropdown-link">
                  Profile
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
