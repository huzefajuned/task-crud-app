import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async () => {
  // generate unique  number
  // save to localstorage
  const random = Math.floor(Math.random() * 1000000000);
  console.log("random", random);
  // const  userInfo = localStorage.setItem('task', Math.rad)
};

export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  console.log('updateTask ', taskData, taskId)
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/tasks/${taskId}`);
};
