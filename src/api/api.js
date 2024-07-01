import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../constants/apiConstants";

const api = axios.create({
    baseURL: API_BASE_URL,
})

export const fetchTasks = () => api.get(ENDPOINTS.TASKS);
export const fetchTask = (id) => api.get(ENDPOINTS.TASK_DETAIL(id));
export const createTask = (task) => api.post(ENDPOINTS.TASKS, task);
export const updateTask = (id, task) => api.put(ENDPOINTS.TASK_DETAIL(id), task);
export const deleteTask = (id) => api.delete(ENDPOINTS.TASK_DETAIL(id));
