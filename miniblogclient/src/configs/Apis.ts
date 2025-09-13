import axios, { type AxiosInstance } from "axios";
const BASE_URL = "http://localhost:8080/miniblog/api";

export const endpoints = {
  posts: "/public/posts",
  addPost:"/auth/posts",
  signUp: "/public/users/register",
  signIn: "/public/users/login",
  current_user:"auth/users/me"
};

export const authApis = (): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const Apis: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
