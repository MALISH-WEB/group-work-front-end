import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getNotifications, markNotificationRead } from "../api/notificationsApi";

export default function Notifications() {
  const { user } = useAuth();
  const [list, setList] = useState([]);

  const load = () => {
    getNotifications(user.id).then(setList);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    await markNotificationRead(id);
    load();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-ucu-maroon mb-6">Notifications</h1>

      {list.length === 0 && <p>No notifications yet.</p>}

      <div className="space-y-4">
        {list.map((n) => (
          <div
            key={n.id}
            className={`p-4 border rounded shadow ${
              n.status === "unread" ? "bg-yellow-100" : "bg-gray-100"
            }`}
          >
            <p className="font-semibold">{n.message}</p>
            <p className="text-xs text-gray-600">{n.created_at}</p>

            {n.status === "unread" && (
              <button
                className="bg-ucu-maroon text-white px-3 py-1 mt-2 rounded"
                onClick={() => markRead(n.id)}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
