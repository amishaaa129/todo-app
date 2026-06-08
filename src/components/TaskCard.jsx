const TaskCard = ({ task, onDelete, onToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between">
        <div>
          <h2
            className={`text-lg font-semibold ${
              task.completed
                ? "line-through text-gray-400"
                : ""
            }`}
          >
            {task.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>

          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
              {task.priority}
            </span>

            {task.dueDate && (
              <span className="px-2 py-1 bg-blue-100 rounded text-xs">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggle(task._id)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            {task.completed ? "Undo" : "Done"}
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;