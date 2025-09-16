import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const [remarks, setRemarks] = useState([]);
  const [filteredRemarks, setFilteredRemarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const token = localStorage.getItem("token"); // admin token
        const res = await axios.get("https://calendarbackendnew.onrender.com/api/remarks/admin/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setRemarks(res.data.data);
          setFilteredRemarks(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch remarks");
      } finally {
        setLoading(false);
      }
    };

    fetchRemarks();
  }, []);

  // Filter remarks by user name or email
  useEffect(() => {
    const filtered = remarks.filter((remark) => {
      const fullName = `${remark.user.firstName} ${remark.user.lastName}`.toLowerCase();
      const email = remark.user.email.toLowerCase();
      const term = search.toLowerCase();
      return fullName.includes(term) || email.includes(term);
    });
    setFilteredRemarks(filtered);
  }, [search, remarks]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="flex h-screen">

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4">All Remarks (Admin)</h2>

        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 mb-4 w-full"
        />

        {filteredRemarks.length === 0 ? (
          <p>No remarks found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Sr No.</th>
                  <th className="p-3">Remark Name</th>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">From</th>
                  <th className="p-3">To</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Done</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Advance</th>
                  <th className="p-3">Priority</th>
                </tr>
              </thead>
              <tbody>
                {filteredRemarks.map((remark, index) => (
                  <tr key={remark._id} className="border-t">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{remark.name}</td>
                    <td className="p-3">{remark.user.firstName} {remark.user.lastName}</td>
                    <td className="p-3">{remark.user.email}</td>
                    <td className="p-3">{remark.mobileNumber}</td>
                    <td className="p-3">{remark.fromAddress}</td>
                    <td className="p-3">{remark.toAddress}</td>
                    <td className="p-3">{new Date(remark.date).toLocaleDateString()}</td>
                    <td className="p-3">{remark.done ? "Yes" : "No"}</td>
                    <td className="p-3">{remark.totalAmount}</td>
                    <td className="p-3">{remark.advanceAmount}</td>
                    <td className="p-3">{remark.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
