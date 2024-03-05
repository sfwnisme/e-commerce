import { AXIOS, LOGOUT } from "../utils/AXIOS";
import Cookie, { ICookie } from "cookie-universal";

export const useLogout = () => {
  const cookie: ICookie = Cookie();

  const logout = async () => {
    try {
      const res = await AXIOS.get(`${LOGOUT}`);
      cookie.remove("TOKEN");
      window.location.pathname = "/";
      console.log("logged out", res);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("done");
    }
  };

  return logout;
};

