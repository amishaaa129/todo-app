import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchTasks = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/v1/tasks`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        navigate("/signin");
        return;
      }

      setTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    await fetch(
      `${API_BASE_URL}/api/tasks/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    fetchTasks();
  };

  const toggleTask = async (id) => {
    await fetch(
      `${API_BASE_URL}/api/v1/tasks/${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          My Tasks
        </h1>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              No tasks found.
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;