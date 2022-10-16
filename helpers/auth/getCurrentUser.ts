import { UserResponse } from "../../interfaces/userContext";

export const getCurrentUser = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }
  ).then((response): Promise<UserResponse> => response.json());

  return response;
};
