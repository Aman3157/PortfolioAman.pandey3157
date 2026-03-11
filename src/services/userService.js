import axios from "axios";

// Base URL comes from .env → REACT_APP_API_BASE_URL
// e.g. in .env: REACT_APP_API_BASE_URL=http://localhost:3000
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getUsers = () => API.get("/users/getusers");

export const createUser = (data) => API.post("/users", data);

export const generateAIContent = (prompt) =>
  API.post("/generateGemini", { prompt });