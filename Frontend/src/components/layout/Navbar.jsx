import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-[#2b2b2b] text-white flex items-center justify-center">
            <FaCode size={18} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              CodeHustle
            </h1>

            <p className="text-xs text-gray-500">
              Hackathon Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/hackathons"
            className="hover:text-blue-600 transition"
          >
            Hackathons
          </Link>

          <Link
            to="/leaderboard"
            className="hover:text-blue-600 transition"
          >
            Leaderboard
          </Link>

        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-[#2b2b2b] text-white hover:bg-black transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;