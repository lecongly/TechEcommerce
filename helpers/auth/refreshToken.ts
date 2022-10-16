export const refreshToken = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }
  ).then((response) => response.json());

  return response;
};
