import { User } from "../../interfaces/userContext";
import myAxios from "../axios";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await myAxios.get("/api/users");

  return data;
};
