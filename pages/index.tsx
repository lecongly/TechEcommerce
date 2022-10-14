import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Layout from "../components/layout";
import Header from "../components/layout/Header";
import Loader from "../components/Loader";
import Products from "../components/products/Products";
import VerticalProductCard from "../components/products/VerticalProductCard";
import { AppContext } from "../context/AppContext";
import { CategoryInterface } from "../interfaces/categories";
import { ProductInterface } from "../interfaces/products";

const Home: NextPage = () => {
  const { productsContent } = useContext(AppContext);
  const { products, productsLoading } = productsContent;
  console.log(products);
  const [latest, setLatest] = useState<ProductInterface[]>([]);
  const [category, setCategory] = useState<CategoryInterface>({
    name: "All",
    _id: "1",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  });
  useEffect(() => {
    if (products) {
      const newProducts = products
        .filter((el) => el.checked === true && el.stock > 0)
        .slice(0, 4);
      setLatest(newProducts);
    }
  }, [products]);
  return (
    <Layout title="Home - TechEcommerce">
      <section className="max-w-screen-xl mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12  mb-10">
        <h2 className=" font-semibold text-xl text-gray-900 mb-6">
          New Products
        </h2>
        {productsLoading ? (
          <Loader />
        ) : (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 w-full">
            {latest.map((product) => (
              <VerticalProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-screen-xl mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12">
        <div className="flex flex-row items-center justify-between pb-5">
          <div>
            <h2 className=" font-semibold text-xl text-gray-900 mb-6">Shop</h2>
            <h2 className="mt-3 text-sm">Products / {category.name}</h2>
          </div>
          <div>
            <span>{products.length}</span>
            <span className="ml-1">
              {products?.length === 1 ? "Product" : "Products"}
            </span>
          </div>
        </div>
        <div className="w-full grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-5">
          <Categories setCategory={setCategory} category={category} />
          <Products category={category} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
