import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Events from "./pages/Events";
import Banner from "./pages/Banner";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login without layout */}
        <Route path="/" element={<Login />} />

        {/* Admin Layout */}
        <Route
          path="/*"
          element={
            <div className="flex h-screen bg-gray-100">
              {/* Fixed Sidebar */}
              <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10">
                <Sidebar />
              </div>

              {/* Main content with left margin for sidebar */}
              <div className="flex-1 ml-64 flex flex-col">
                {/* Fixed Navbar */}
                <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow z-10">
                  <Navbar />
                </div>

                {/* Scrollable content below navbar, scrollbar hidden */}
                <div
                  className="flex-1 overflow-auto scrollbar-none bg-gray-100"
                  style={{
                    paddingTop: "20px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingBottom: "15px",
                    marginTop: "64px", // space below Navbar
                  }}
                >
                  <div style={{minWidth: "calc(100% - 30px)"}}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/banner" element={<Banner />} />
                    </Routes>
                  </div>
                </div>
                </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
