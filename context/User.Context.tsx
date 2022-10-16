import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { ProductInterface } from "../interfaces/products";

import {
  CartInterface,
  SignInInterface,
  SignUpInterface,
  User,
  userContextProps,
  userProviderProps,
} from "../interfaces/userContext";
import Cookies from "js-cookie";
import { refreshToken } from "../helpers/auth/refreshToken";
import { getCurrentUser } from "../helpers/auth/getCurrentUser";
import { LayoutContext } from "./LayoutContext";
import { AlertTypes } from "../interfaces/frontend/alerts";
import myAxios from "../helpers/axios";
import { clearTokens, setTokensToCookie } from "../helpers/cookie";

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

  const { activateAlert } = useContext(LayoutContext);

  useEffect(() => {
    const authToken = Cookies.get("access");
    if (authToken) {
      setToken(authToken);
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
  // Get the total of cart.
  useEffect(() => {
    const getTotal = async () => {
      const total = cart.reduce((total, el) => {
        return total + el.price * el.quantity;
      }, 0);
      setCartTotal(total);
    };
    getTotal();
  }, [cart]);

  const signIn = async (values: SignInInterface) => {
    setIsLoading(true);
    try {
      const { data } = await myAxios.post("/api/users/login", { ...values });
      setToken(data.accessToken);
      setTokensToCookie(data.accessToken, data.refreshToken);
      setIsLoading(false);
    } catch (error: any) {
      if (error.response.data) {
        setIsLoading(false);
        activateAlert(AlertTypes.ERROR, error.response.data.message);
      }
    }
  };
  const signUp = async (values: SignUpInterface) => {
    setIsLoading(true);
    try {
      const { data } = await myAxios.post("/api/users/register", { ...values });
      setToken(data.accessToken);
      setTokensToCookie(data.accessToken, data.refreshToken);
      setIsLoading(false);
    } catch (error: any) {
      if (error.response.data) {
        setIsLoading(false);
        activateAlert(AlertTypes.ERROR, error.response.data.message);
      }
    }
  };
  // Sign out verification
  const signOut = () => {
    clearTokens();
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
  // Cart
  const addToCart = async (product: CartInterface) => {
    if (isLogged && !isAdmin) {
      const check = cart?.every((item) => {
        return item._id !== product._id;
      });
      if (check) {
        try {
          const { data } = await myAxios.patch("/api/users/add_cart", {
            cart: [...cart, { ...product, quantity: 1 }],
          });
          activateAlert(AlertTypes.SUCCESS, data.messages);
          setCart([...cart, { ...product, quantity: 1 }]);
        } catch (error: any) {
          if (error.response.data) {
            setIsLoading(false);
            activateAlert(AlertTypes.ERROR, error.response.data.message);
          }
        }
      } else {
        activateAlert(AlertTypes.ERROR, "Error, this product is in your cart.");
      }
    }
  };
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
