import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { user, logout, isAdmin, isStaff, isStudent } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-ucu-maroon text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="font-bold text-xl">UCU Innovators Hub</Link>

      <div className="flex gap-6 items-center">

        <Link to="/projects">Projects</Link>

        {user && (
          <>
            {(isStudent || isStaff || isAdmin) && <Link to="/submit">Submit Project</Link>}
            {(isStaff || isAdmin) && <Link to="/approvals">Approvals</Link>}
            {isAdmin && <Link to="/admin/analytics">Analytics</Link>}
            {isAdmin && <Link to="/admin/users">Users</Link>}

            {/* Notification Icon */}
            <Link to="/notifications" className="text-xl hover:text-gray-300">
              <FaBell />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="text-2xl hover:text-gray-300"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaUserCircle />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/notifications"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Notifications
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
      </div>
    </nav>
  );
}
