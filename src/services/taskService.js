const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getTasks = async () => {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, {
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch tasks');
  }

  return data.data;
};

export const createTask = async (task) => {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(task),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to create task');
  }

  return data.data;
};

export const toggleTask = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/api/tasks/${id}/status`,
    {
      method: 'PATCH',
      credentials: 'include',
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const deleteTask = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/api/tasks/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.data;
};