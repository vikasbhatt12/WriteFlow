// client/src/api.js
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';


const getConfig = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  const token = userInfo ? userInfo.token : null;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
  return response.data;
};

export const getAllPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData, getConfig());
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${id}`, postData, getConfig());
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${id}`, getConfig());
  return response.data;
};

export const getMyPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts/my-posts`, getConfig());
  return response.data;
};