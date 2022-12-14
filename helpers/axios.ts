import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./auth/refreshToken";

const myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

myAxios.interceptors.request.use(async (config: any) => {
  if (
    config.url.indexOf("/login") >= 0 ||
    config.url.indexOf("/register") >= 0 ||
    config.url.indexOf("/refresh") >= 0
  ) {
    return config;
  }
  const accessExpires = Number(Cookies.get("accessExpires"));
  const now = new Date().getTime();
  if (accessExpires < now) {
    console.log("refreshToken");
    await refreshToken();
  }
  return config;
});

export default myAxios;
