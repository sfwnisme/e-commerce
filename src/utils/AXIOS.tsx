import axios, { AxiosInstance } from "axios";
import { getCookie } from "./COOKIES";

/**
 * ---------------------------------------------------
 * Axios instance
 * ---------------------------------------------------
 */
export const AXIOS: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    Authorization: `Bearer ${getCookie("TOKEN")}`,
  },
});

/**
 * ---------------------------------------------------
 * Api Endpoints
 * ---------------------------------------------------
 */
// auth endpoints
export const REGISTER: string = "register";
export const LOGIN: string = "login";
export const LOGOUT: string = "logout";

// data endpoints
export const USERS: string = "users";
export const USER: string = "user";
export const CATEGORY: string = "category";
export const CATEGORIES: string = "categories";
export const PRODUCTS: string = "products";
export const PRODUCT: string = "product";
