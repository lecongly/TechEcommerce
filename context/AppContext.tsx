import { createContext, useEffect, useState } from "react";
import { CategoryInterface } from "../interfaces/categories";
import { appContextProps } from "../interfaces/context/AppContext";
import { ContextProviderProps } from "../interfaces/context/contextProvider";
import { ProductInterface } from "../interfaces/products";
import useSWR from "swr";
import myAxios from "../helpers/axios";

export const AppContext = createContext({} as appContextProps);

export const AppProvider = ({ children }: ContextProviderProps) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [productSearch, setProductSearch] = useState<string>("");
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);

  const fetcherProducts = async (url: string): Promise<ProductInterface[]> => {
    return await myAxios
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  };
  const fetcherCategories = async (
    url: string
  ): Promise<CategoryInterface[]> => {
    return await myAxios
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const { data: productsData, isValidating: productsLoading } = useSWR(
    `/api/products`,
    fetcherProducts
  );
  const { data: categoriesData, isValidating: categoriesLoading } = useSWR(
    `/api/categories`,
    fetcherCategories
  );
  useEffect(() => {
    if (productsData) {
      const sortedProducts = productsData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setProducts(sortedProducts);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  return (
    <AppContext.Provider
      value={{
        signInModal: { openSignInModal, setOpenSignInModal },
        signUpModal: { openSignUpModal, setOpenSignUpModal },
        productsContent: { products, productsLoading },
        categoriesContent: { categories, categoriesLoading },
        productSearch,
        setProductSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
