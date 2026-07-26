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
    `rounded-full px-4 py-2 transition duration-200 font-medium ${
      isActive
        ? "bg-blue-50 text-blue-700 shadow-sm"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-900 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
            <FaCode />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              CodeHustle
            </h1>

            <p className="text-xs text-slate-500 tracking-[0.24em] uppercase">
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
                className="px-5 py-2 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition"
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
                <FaUserCircle size={26} className="text-slate-500" />

                <span className="font-semibold text-slate-700">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full transition shadow-lg shadow-slate-900/15"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden rounded-full p-2 text-slate-700 hover:bg-slate-100"
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
        <div className="md:hidden bg-white/95 border-t border-slate-200 shadow-2xl">

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