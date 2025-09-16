import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/"); // redirect to login page
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Admin Panel</h1>
        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700"
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700"
              }`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/banner"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700"
              }`
            }
          >
            Banner
          </NavLink>
        </nav>
      </div>

      {/* ✅ Logout button at bottom */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </aside>
  );
}
