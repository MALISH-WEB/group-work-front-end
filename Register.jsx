import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",   // default role
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    await register({
      ...form,
      faculty_id: null,   // backend expects this
    });

    nav("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <input
          name="name"
          className="border w-full p-3 mb-4 rounded"
          placeholder="Full Name"
          onChange={change}
        />

        <input
          name="email"
          className="border w-full p-3 mb-4 rounded"
          placeholder="Email"
          type="email"
          onChange={change}
        />

        <input
          name="password"
          type="password"
          className="border w-full p-3 mb-4 rounded"
          placeholder="Password"
          onChange={change}
        />

        {/* ROLE SELECTION */}
        <select
          name="role"
          className="border w-full p-3 mb-4 rounded"
          onChange={change}
          defaultValue="student"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="staff">staff</option>
        </select>

        <button className="w-full bg-ucu-maroon text-white p-3 rounded mt-2 hover:bg-red-900">
          Register
        </button>
      </form>
    </div>
  );
}
