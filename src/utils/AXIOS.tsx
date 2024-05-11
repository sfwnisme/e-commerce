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
export const USERS = "users";
export const USER = "user";
export const CATEGORY = "category";
export const CATEGORIES = "categories";

export const PRODUCTS = "products";
export const PRODUCTS_LATEST_SALE = "latest-sale";
export const PRODUCTS_LATEST = "latest";
export const PRODUCTS_TOP_RATED = "top-rated";
export const PRODUCT = "product";
