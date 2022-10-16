import Cookies from "js-cookie";
import myAxios from "../axios";
import { setTokensToCookie } from "../cookie";

export const refreshToken = async () => {
  try {
    const { data } = await myAxios.post("/api/users/refresh");
    setTokensToCookie(data.accessToken, data.refreshToken);
  } catch (error) {
    console.log(error);
  }
};
