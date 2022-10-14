import { createContext, useEffect, useState } from "react";
import { CategoryInterface } from "../interfaces/categories";
import { appContextProps } from "../interfaces/context/AppContext";
import { ContextProviderProps } from "../interfaces/context/contextProvider";
import { ProductInterface } from "../interfaces/products";
import useSWR from "swr";

export const AppContext = createContext({} as appContextProps);

export const AppProvider = ({ children }: ContextProviderProps) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [productSearch, setProductSearch] = useState<string>("");

  const fetcherProducts = (args: string) =>
    fetch(args).then((res): Promise<ProductInterface[]> => res.json());

  const fetcherCategories = (args: string) =>
    fetch(args).then((res): Promise<CategoryInterface[]> => res.json());

  const { data: productsData, isValidating: productsLoading } = useSWR(
    `https://lcl-restful-api.herokuapp.com/api/products`,
    fetcherProducts
  );
  const { data: categoriesData, isValidating: categoriesLoading } = useSWR(
    `https://lcl-restful-api.herokuapp.com/api/categories`,
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
