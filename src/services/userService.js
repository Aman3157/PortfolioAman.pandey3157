import axios from "axios";

// const API = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com"
// });


const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});



export const getUsers = () => API.get("/users");

export const createUser = (data) => API.post("/users", data);