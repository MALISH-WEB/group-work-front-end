import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

export default function SubmitProject() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    faculty: "",
    github_url: "",
    live_url: "",
  });

  const [file, setFile] = useState(null);

  // Handle input change
  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("faculty", form.faculty);
    formData.append("github_url", form.github_url);
    formData.append("live_url", form.live_url);

    if (file) formData.append("file", file);

    try {
      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Project submitted successfully!");

      setForm({
        title: "",
        description: "",
        category: "",
        faculty: "",
        github_url: "",
        live_url: "",
      });

      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit project");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-ucu-maroon mb-6">
        Submit Your Project
      </h1>

      <form onSubmit={submit} className="space-y-4">
        
        {/* Title */}
        <input
          name="title"
          className="border p-3 w-full rounded"
          placeholder="Project Title"
          value={form.title}
          onChange={change}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          className="border p-3 w-full rounded"
          placeholder="Project Description"
          rows="4"
          value={form.description}
          onChange={change}
          required
        />

        {/* Category (typed manually) */}
        <input
          name="category"
          className="border p-3 w-full rounded"
          placeholder="Category (e.g. AI, Web Dev, IoT)"
          value={form.category}
          onChange={change}
          required
        />

        {/* Faculty (typed manually) */}
        <input
          name="faculty"
          className="border p-3 w-full rounded"
          placeholder="Faculty (e.g. Computing, Business, Education)"
          value={form.faculty}
          onChange={change}
          required
        />

        {/* GitHub URL */}
        <input
          name="github_url"
          className="border p-3 w-full rounded"
          placeholder="GitHub Repository URL (optional)"
          value={form.github_url}
          onChange={change}
        />

        {/* Live URL */}
        <input
          name="live_url"
          className="border p-3 w-full rounded"
          placeholder="Live Project URL (optional)"
          value={form.live_url}
          onChange={change}
        />

        {/* File Upload */}
        <input
          type="file"
          accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.png"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-3 w-full rounded"
        />

        <button className="bg-ucu-maroon text-white p-3 rounded font-bold w-full">
          Submit Project
        </button>
      </form>
    </div>
  );
}
