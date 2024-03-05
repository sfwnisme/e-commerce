import Cookie, { ICookie } from "cookie-universal";
const cookie: ICookie = Cookie();

// cookies
// type SetCookieType = (name: string, value: string) => void;
type CookieType = (name: string, value?: string) => void;

// set cookie
export const setCookie: CookieType = (name, value) => cookie.set(name, value);

// get cookie
export const getCookie: CookieType = (name) => cookie.get(name);

// remove cookie
export const removeCookie: CookieType = (name) => cookie.remove(name);

// token
export const TOKEN = cookie.get("TOKEN");
export const ROLE = cookie.get("ROLE");
