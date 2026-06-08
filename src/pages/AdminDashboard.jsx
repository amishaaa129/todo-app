import { useEffect, useState } from "react";
import Header from "../components/Header";

const AdminDashboard = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/users`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    if (res.ok) {
      setUsers(data.data);
    }
  };

  const fetchTasks = async () => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/tasks`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    if (res.ok) {
      setTasks(data.data);
    }
  };

  const promoteUser = async (userId) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/v1/admin/users/${userId}/promote`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/v1/admin/tasks/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchUsers(),
      fetchTasks(),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Users */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Users
            </h2>

            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="border p-3 rounded"
                >
                  <p>
                    <strong>Name:</strong>{" "}
                    {user.fullname}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {user.email}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {user.role}
                  </p>

                  {user.role !== "admin" && (
                    <button
                      onClick={() =>
                        promoteUser(user._id)
                      }
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Promote to Admin
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Tasks
            </h2>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border p-3 rounded"
                >
                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <p className="text-gray-600">
                    {task.description}
                  </p>

                  <p className="text-sm mt-1">
                    Owner:{" "}
                    {task.user?.fullname}
                  </p>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete Task
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;