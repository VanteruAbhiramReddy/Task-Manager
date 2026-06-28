import { API_URLS } from './urls.js';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
});

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get('content-type') || '';
  let payload = null;

  try {
    payload = contentType.includes('application/json') ? await response.json() : await response.text();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload?.message || payload?.error || 'Request failed';
    throw new Error(message);
  }

  return payload;
};

export const signupUser = async ({ name, email, password }) => {
  return requestJson(API_URLS.signup, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const loginUser = async ({ email, password }) => {
  return requestJson(API_URLS.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const deleteAccountUser = async ({ password }) => {
  return requestJson(API_URLS.deleteAccount, {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
};

export const logoutUser = async () => {
  return requestJson(API_URLS.logout, { method: 'DELETE' });
};

export const getDashboard = async () => {
  return requestJson(API_URLS.dashboard, { method: 'GET' });
};

export const getTasks = async () => {
  return requestJson(API_URLS.tasks, { method: 'GET' });
};

export const createTask = async (task) => {
  return requestJson(API_URLS.tasks, {
    method: 'POST',
    body: JSON.stringify(task),
  });
};

export const updateTask = async (task) => {
  return requestJson(API_URLS.tasks, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (taskId) => {
  return requestJson(`${API_URLS.tasks}/${taskId}`, { method: 'DELETE' });
};
