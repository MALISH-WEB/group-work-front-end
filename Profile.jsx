import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateProfile, getUserProjects } from "../api/userApi";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const [info, setInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    getUserProfile(user.id).then((data) => {
      setInfo(data);
      setForm({ name: data.name, email: data.email });
    });

    getUserProjects(user.id).then(setProjects);
  }, [user.id]);

  const handleSave = async () => {
    await updateProfile(user.id, form);
    setEditing(false);
    getUserProfile(user.id).then(setInfo);
  };

  if (!info) return <p className="text-center mt-10">Loading Profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-ucu-maroon mb-6">
        Profile
      </h1>

      {/* Personal Info Section */}
      <div className="bg-white p-6 border rounded shadow mb-8">
        {!editing ? (
          <>
            <p><strong>Name:</strong> {info.name}</p>
            <p><strong>Email:</strong> {info.email}</p>
            <p><strong>Faculty:</strong> {info.faculty_name}</p>
            <p><strong>Role:</strong> {info.role}</p>

            <button
              onClick={() => setEditing(true)}
              className="bg-ucu-maroon text-white px-4 py-2 rounded mt-4"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              className="border p-3 w-full mb-3 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="border p-3 w-full mb-3 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="ml-3 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* User Projects List */}
      <h2 className="text-2xl font-bold text-ucu-maroon mb-4">
        My Submissions
      </h2>

      {projects.length === 0 ? (
        <p>No submitted projects yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="bg-white border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-ucu-maroon">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.status}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
