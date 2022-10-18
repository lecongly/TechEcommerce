import myAxios from "../axios";

export const getHistoryPayments = async () => {
  const response = await myAxios.get("/api/users/payments");
  return response;
};
