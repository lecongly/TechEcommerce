import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { ProductInterface } from "../interfaces/products";

import {
  CartInterface,
  SignInInterface,
  User,
  userContextProps,
  userProviderProps,
} from "../interfaces/userContext";
import Cookies from "js-cookie";
import { refreshToken } from "../helpers/auth/refreshToken";
import { getCurrentUser } from "../helpers/auth/getCurrentUser";

export const UserContext = createContext({} as userContextProps);

export const UserProvider = ({ children }: userProviderProps) => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [userPayments, setUserPayments] = useState<any[]>([]);
  const [cart, setCart] = useState<CartInterface[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [wishList, setWishList] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const authToken = Cookies.get("access");
    if (authToken) {
      setToken(authToken);
      refreshToken().then((data) => {
        setToken(data.accessToken);
        Cookies.set("access", data.accessToken, {
          expires: new Date().getTime() + 5 * 60 * 1000,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        if (data.refreshToken) {
          Cookies.set("refresh", data.refreshToken, {
            expires: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
          });
        }
      });
    }
  }, []);
  //Get the user information from destructing the uid from token.
  useEffect(() => {
    if (token) {
      getCurrentUser()
        .then((data) => {
          setUser(data);
          setWishList(data.wishList);
          setCart(data.cart);
          setIsAdmin(data.role === 1 ? true : false);
          setIsLogged(true);
        })
        .catch((err) => console.error(err));
    }
    setIsLoading(false);
  }, [token]);
  const signIn = async (values: SignInInterface) => {
    setIsLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({ ...values }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.accessToken);
        Cookies.set("access", data.accessToken, {
          expires: new Date().getTime() + 5 * 60 * 1000,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        Cookies.set("refresh", data.refreshToken, {
          expires: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };
  const signUp = async (values: SignInInterface) => {
    setIsLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
      method: "POST",
      body: JSON.stringify({ ...values }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.accessToken);
        Cookies.set("access", data.accessToken, {
          expires: new Date().getTime() + 5 * 60 * 1000,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        Cookies.set("refresh", data.refreshToken, {
          expires: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };
  // Sign out verification
  const signOut = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Router.push("/");
    setIsLogged(false);
    setUser(null);
    setUserPayments([]);
    setCart([]);
    setToken("");
    setIsAdmin(false);
    setIsLogged(false);
    setIsLoading(false);
  };
  const addToCart = () => {};
  const incrementQuantity = () => {};
  const decrementQuantity = () => {};
  const removeProductFromCart = () => {};
  const addToWishList = () => {};
  const removeProductFromWishList = () => {};
  return (
    <UserContext.Provider
      value={{
        token,
        isLoading,
        isAdmin,
        isLogged,
        user,
        userPayments,
        cart,
        cartTotal,
        wishList,
        signIn,
        signUp,
        signOut,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeProductFromCart,
        addToWishList,
        removeProductFromWishList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
