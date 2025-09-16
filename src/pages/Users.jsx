import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT from login
        const res = await axios.get("https://calendarbackend-ppif.onrender.com/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term (name or email)
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Users</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-sm focus:outline-none focus:ring focus:border-blue-300"
      />

      <table className="w-full bg-white shadow rounded-2xl">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Sr No.</th>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Password</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id} className="border-t">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{user._id}</td>
              <td className="p-3">{user.firstName} {user.lastName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.password}</td> {/* Consider masking for security */}
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
 