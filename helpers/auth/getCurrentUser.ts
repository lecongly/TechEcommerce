import { UserResponse } from "../../interfaces/userContext";
import myAxios from "../axios";

export const getCurrentUser = async (): Promise<UserResponse> => {
  const { data } = await myAxios.get("api/users/me");
  return data;
};
