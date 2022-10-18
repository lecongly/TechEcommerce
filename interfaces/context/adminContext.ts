import { User } from "../userContext";

export type AdminContextProps = {
  users: User[] | null;
  payments: any[];
  deleteUser: (id: string) => void;
  checkProduct: (id: string) => void;
  uncheckProduct: (id: string) => void;
};
