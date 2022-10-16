import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./auth/refreshToken";

const myAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
  console.log("Het han: ", accessExpires < now);
  if (accessExpires < now) {
    console.log("refreshToken");
    await refreshToken();
  }
  return config;
});

export default myAxios;
