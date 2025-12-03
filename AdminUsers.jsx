import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../api/adminUsersApi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("");

  const loadUsers = () => {
    getAllUsers().then(setUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id, role) => {
    await updateUserRole(id, role);
    loadUsers();
  };

  const remove = async (id) => {
    if (!confirm("Are you sure?")) return;
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-ucu-maroon mb-6">
        Manage Users
      </h1>

      <select
        className="border p-3 rounded mb-6"
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="student">Students</option>
        <option value="admin">Admins</option>
        <option value="staff">Staff</option>
      </select>

      <table className="w-full border">
        <thead>
          <tr className="bg-ucu-maroon text-white">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Faculty</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((u) => !filterRole || u.role === filterRole)
            .map((u) => (
              <tr key={u.id} className="border">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.faculty_name}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 rounded"
                    onClick={() => changeRole(u.id, "admin")}
                  >
                    Make Admin
                  </button>
                  <button
                    className="bg-blue-600 text-white px-3 rounded"
                    onClick={() => changeRole(u.id, "staff")}
                  >
                    Make Staff
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 rounded"
                    onClick={() => remove(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
