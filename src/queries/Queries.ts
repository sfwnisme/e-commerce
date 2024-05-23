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
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  role?: string;
  google_id?: string | number | null;
  google_token?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export const usersQuery: () => Promise<AxiosResponse<IUser>> = async () =>
  await AXIOS.get(`${USERS}`);

// get single user
export const userQuery = async (id: string) => await AXIOS.get(`${USER}/${id}`);

// delete user
type UserDeleteQueryType = (id: string) => Promise<AxiosResponse>;
export const userDeleteQuery: UserDeleteQueryType = async (id) =>
  await AXIOS.delete(`${USER}/${id}`);
