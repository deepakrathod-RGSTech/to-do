import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const getTodos = async (token) => {
  const response = await axios.get(`${API_URL}/todos`, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export const createTodo = async (token, todoData) => {
  const response = await axios.post(`${API_URL}/todos`, todoData, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export const updateTodo = async (token, id, todoData) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, todoData, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export const deleteTodo = async (token, id) => {
  const response = await axios.delete(`${API_URL}/todos/${id}`, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};
