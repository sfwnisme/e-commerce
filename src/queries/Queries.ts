import { AxiosInstance, AxiosResponse } from "axios";
import { AXIOS, LOGIN, REGISTER, USER, USERS } from "../utils/AXIOS";

// registeration query
export interface IRegister {
  name: string;
  email: string;
  password: string;
}
export const registerationQuery = async (data: IRegister) =>
  await AXIOS.post(`${REGISTER}`, data);

// login query
export interface ILogin {
  email: string;
  password: string;
}
export const loginQuery = async (data: ILogin) =>
  await AXIOS.post(`${LOGIN}`, data);

// data union api request for (users, categories, products, etc..)
type SearchDataQueryType = (
  searchEndpoint: string,
  objectKey: string,
  search: string
) => Promise<AxiosResponse>;

export const searchDataQuery: SearchDataQueryType = async (
  searchEndpoint,
  objectKey,
  search
) => await AXIOS.post(`/${searchEndpoint}/search?${objectKey}=${search}`);

// users
export interface IUser {
  id?: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  role: string;
  google_id?: string | number | null;
  google_token?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  password: string | undefined;
}
export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface IUserUpdate {
  name: string;
  email: string;
  role: string;
}
export const usersQuery: () => Promise<AxiosResponse<IUser>> = async () =>
  await AXIOS.get(`${USERS}`);

// get single user
export const userQuery = async (id: string) => await AXIOS.get(`${USER}/${id}`);

// delete user
type UserDeleteQueryType = (id: string) => Promise<AxiosResponse>;
export const userDeleteQuery: UserDeleteQueryType = async (id) =>
  await AXIOS.delete(`${USER}/${id}`);

// categories
export interface ICategory {
  id: number;
  title: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}
export interface ICategoryAdd {
  title: string;
  image: FileList;
}

// export const categoriesQuery

// products
export interface IProduct {
  id: number;
  title: string;
  description?: string;
  About?: string;
  price: string;
  discount?: string;
  images?: {
    id: number;
    image: string;
    prdouct_id?: number;
    created_at?: string;
    updated_at?: string;
  }[];
  category: number;
  rating?: string;
  ratings_number?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
