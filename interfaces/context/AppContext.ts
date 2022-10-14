import { CategoryInterface } from "../categories";
import { ProductInterface } from "../products";

export type appContextProps = {
  productsContent: Products;
  categoriesContent: Categories;
  productSearch: string;
  setProductSearch: (arg: string) => void;
};

interface Products {
  products: ProductInterface[];
  productsLoading: boolean;
}
interface Categories {
  categories: CategoryInterface[];
  categoriesLoading: boolean;
}
