import { ProductInterface } from "./products";

export type userContextProps = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  isLogged: boolean;
  userPayments: any;
  cart: CartInterface[];
  cartTotal: number;
  wishList: ProductInterface[];
  token: string;
  signIn: (obj: SignInInterface) => void;
  signUp: (obj: SignUpInterface) => void;
  signOut: () => void;
  addToCart: (obj: CartInterface) => void;
  removeProductFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;

  addToWishList: (obj: ProductInterface) => void;
  removeProductFromWishList: (id: string) => void;
};

export interface userProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface SignUpInterface {
  name: string;
  email: string;
  password: string;
}

export interface tokenResponse {
  token: string;
}

export interface SignUpResponse {
  token: string;
  user: User;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: number;
  tokenVersion: number;
  avatar: string;
  state: boolean;
  cart: any[];
  wishList: any[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: number;
  tokenVersion: number;
  avatar: string;
  state: boolean;
  cart: any[];
  wishList: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CartInterface {
  _id: string;
  product_id: string;
  name: string;
  price: number;
  description: string;
  content: string;
  image: Image;
  category: string;
  checked: boolean;
  sold: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;
}

export interface Image {
  public_id: string;
  url: string;
}
