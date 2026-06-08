import { useState } from 'react';

const TaskForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);

    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow"
    >
      <input
        type="text"
        placeholder="Task title"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-3"
        required
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-3"
      />

      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) =>
          setFormData({
            ...formData,
            dueDate: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-3"
      />

      <select
        value={formData.priority}
        onChange={(e) =>
          setFormData({
            ...formData,
            priority: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-3"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;