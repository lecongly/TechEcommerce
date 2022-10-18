import { createContext, useContext, useEffect, useState } from "react";

import { getUsers } from "../helpers/admin/getAllUsers";
import myAxios from "../helpers/axios";

import { AdminContextProps } from "../interfaces/context/adminContext";
import { ContextProviderProps } from "../interfaces/context/contextProvider";
import { User } from "../interfaces/userContext";
import { UserContext } from "./User.Context";

export const AdminContext = createContext({} as AdminContextProps);

export const AdminProvider = ({ children }: ContextProviderProps) => {
  const { isAdmin, isLogged } = useContext(UserContext);

  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (isAdmin && isLogged) {
      getUsers().then((data) => setUsers(data));
      // getHistoryPayments(token).then((data) => setPayments(data));
    }
  }, [isAdmin, isLogged]);

  const deleteUser = async (id: string) => {
    users.forEach((el, i) => {
      if (el._id === id) {
        users.splice(i, 1);
      }
    });
    await myAxios.delete(`/api/users/${id}`);
    setUsers([...users]);
  };
  const checkProduct = async (id: string) => {
    await myAxios.put(`/api/products/${id}`, { checked: true });
  };
  const uncheckProduct = async (id: string) => {
    await myAxios.put(`/api/products/${id}`, { checked: false });
  };

  return (
    <AdminContext.Provider
      value={{ users, payments, deleteUser, checkProduct, uncheckProduct }}
    >
      {children}
    </AdminContext.Provider>
  );
};
