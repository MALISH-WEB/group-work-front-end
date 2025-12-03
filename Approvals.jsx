import { useEffect, useState } from "react";
import { getPendingProjects, approveProject, rejectProject } from "../api/approvalApi";

export default function Approvals() {
  const [projects, setProjects] = useState([]);
  const [feedback, setFeedback] = useState("");

  const loadPending = () => {
    getPendingProjects().then(setProjects);
  };

  useEffect(() => {
    loadPending();
  }, []);

  const approve = async (id) => {
    await approveProject(id);
    loadPending();
  };

  const reject = async (id) => {
    if (!feedback) return alert("Enter feedback");
    await rejectProject(id, feedback);
    setFeedback("");
    loadPending();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-ucu-maroon mb-6">
        Pending Approvals
      </h1>

      {projects.length === 0 && <p>No pending projects.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white shadow p-6 rounded border border-ucu-maroon/40">
            <h2 className="text-xl font-bold text-ucu-maroon">{p.title}</h2>
            <p className="mt-2 text-gray-700">{p.description}</p>

            <p className="mt-3 text-sm">
              <strong>By:</strong> {p.user_name} • <strong>Faculty:</strong> {p.faculty_name}
            </p>

            <div className="mt-4">
              <textarea
                placeholder="Enter feedback before rejecting"
                className="border p-3 w-full rounded"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-3">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => approve(p.id)}
              >
                Approve
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => reject(p.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
