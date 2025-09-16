import { useState, useEffect } from "react";
import axios from "axios";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const API_URL = "https://calendarbackend-ppif.onrender.com/api/banners";

  // ✅ Fetch banners on mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data.success) {
          setBanners(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchBanners();
  }, []);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle upload to backend
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setBanners([res.data.data, ...banners]); // add new banner
        setSelectedFile(null);
        setPreview(null);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error uploading banner:", err);
    }
  };

  // ✅ Delete banner
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.data.success) {
        setBanners(banners.filter((banner) => banner._id !== id));
      }
    } catch (err) {
      console.error("Error deleting banner:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Banner Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Image
        </button>
      </div>

      {/* Banner List */}
      {banners.length === 0 ? (
        <p className="text-gray-500">No banners uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className="relative bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={`https://calendarbackend-ppif.onrender.com${banner.imageUrl}`} // ✅ Serve from backend
                alt={banner.name}
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => handleDelete(banner._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h3 className="text-lg font-bold mb-4">Upload New Banner</h3>

            <input type="file" onChange={handleFileChange} className="mb-4" />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
