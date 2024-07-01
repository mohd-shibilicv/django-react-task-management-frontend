export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  TASKS: `${API_BASE_URL}/tasks/`,
  TASK_DETAIL: (id) => `${API_BASE_URL}/tasks/${id}/`,
};
