import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { CategoryInterface } from "../../interfaces/categories";
import { ProductInterface } from "../../interfaces/products";

import { LayoutContext } from "../../context/LayoutContext";
import Loader from "../Loader";
import HorizontalProductCard from "./HorizontalProductCard";
import ProductView from "./ProductView";
import VerticalProductCard from "./VerticalProductCard";

interface Props {
  category: CategoryInterface;
}

const Products = ({ category }: Props) => {
  const { productsContent } = useContext(AppContext);
  const { products, productsLoading } = productsContent;
  const { gridView } = useContext(LayoutContext);
  const { isGrid } = gridView;
  const [productsCategory, setProductsCategory] = useState<
    ProductInterface[] | undefined
  >([]);

  useEffect(() => {
    const getProductsByCategory = () => {
      if (category._id !== "1") {
        const productsByCategory = products.filter(
          (el) => el.category === category._id
        );
        setProductsCategory(productsByCategory);
      } else {
        setProductsCategory(products);
      }
    };
    getProductsByCategory();
  }, [category, products]);

  return (
    <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-9 xl:col-span-9 w-full content">
      <div className="w-full">
        <ProductView />
        {productsLoading ? (
          <Loader />
        ) : (
          <div
            className={`w-full ${
              isGrid
                ? "grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
                : "flex flex-col items-end justify-start"
            }`}
          >
            {productsCategory?.map((product) =>
              isGrid ? (
                <VerticalProductCard key={product._id} {...product} />
              ) : (
                <HorizontalProductCard key={product._id} {...product} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
