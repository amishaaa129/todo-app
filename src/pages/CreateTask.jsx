import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleCreate = async (taskData) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/v1/tasks/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(taskData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
          data?.error ||
          "Failed to create task"
        );
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Create Task
        </h1>

        <TaskForm onCreate={handleCreate} />
      </div>
    </div>
  );
};

export default CreateTask;