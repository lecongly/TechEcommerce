import { CategoryInterface } from "../categories";
import { ProductInterface } from "../products";

export type appContextProps = {
  signInModal: SignInModal;
  signUpModal: SignUpModal;
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
interface SignInModal {
  openSignInModal: boolean;
  setOpenSignInModal: (arg: boolean) => void;
}

interface SignUpModal {
  openSignUpModal: boolean;
  setOpenSignUpModal: (arg: boolean) => void;
}
