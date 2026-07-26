import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaCode,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardRoute = () => {
    if (!user) return "/";

    switch (user.role) {
      case "admin":
        return "/admin/dashboard";

      case "organizer":
        return "/organizer/dashboard";

      case "judge":
        return "/judge/dashboard";

      default:
        return "/participant/dashboard";
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition duration-200 font-medium ${
      isActive
        ? "text-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-[#2b2b2b] text-white flex items-center justify-center shadow-md">
            <FaCode />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              CodeHustle
            </h1>

            <p className="text-xs text-gray-500">
              Hackathon Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/hackathons"
            className={navLinkClass}
          >
            Hackathons
          </NavLink>

          {user && (
            <>
              <NavLink
                to={dashboardRoute()}
                className={navLinkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={navLinkClass}
              >
                Profile
              </NavLink>
            </>
          )}

        </nav>

        {/* Right Side */}

        <div className="hidden md:flex items-center gap-4">

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="secondary-btn"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-gray-700">
                <FaUserCircle size={26} />

                <span className="font-medium">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <FaTimes size={24} />
          ) : (
            <FaBars size={24} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">

          <div className="flex flex-col p-6 gap-5">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/hackathons"
              onClick={() => setMenuOpen(false)}
            >
              Hackathons
            </NavLink>

            {user && (
              <>
                <NavLink
                  to={dashboardRoute()}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </>
            )}

          </div>

        </div>
      )}
    </header>
  );
}

export default Navbar;