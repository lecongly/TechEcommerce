import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";

import Layout from "../components/layout";

import { ProductInterface } from "../interfaces/products";
import VerticalProductCard from "../components/products/VerticalProductCard";
import Loader from "../components/Loader";

const fetcherAll = (args: string) =>
  fetch(args).then((res): Promise<ProductInterface[]> => res.json());
const fetcherSingle = (args: string) =>
  fetch(args).then((res): Promise<ProductInterface> => res.json());

const ProductDetail = () => {
  const { query } = useRouter();
  const { id } = query;

  const { data, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    fetcherSingle
  );
  const { data: products } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    fetcherAll
  );

  const [relateds, setRelateds] = useState<ProductInterface[]>([]);

  useEffect(() => {
    if (products && data) {
      const relateds = products.filter(
        (el) => el.category === data.category && el._id !== data._id
      );
      setRelateds(relateds);
    }
  }, [products, data, id]);

  return (
    <Layout title="Product detail - TechEcommerce">
      <section className="max-w-screen-xl xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 content mx-auto flex items-start justify-center">
        {isValidating ? (
          <Loader />
        ) : (
          <div className="">
            <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-5">
              <div className="overflow-hidden">
                {data?.image && (
                  <Image
                    src={data.image.url}
                    alt={data.product_id}
                    width={1024}
                    height={964}
                    quality={100}
                    objectFit="contain"
                  />
                )}
              </div>
              <div className="flex items-start justify-center flex-col">
                <h1 className="text-3xl font-semibold">{data?.name}</h1>
                <span className="text-xs font-supremeLight">
                  Ref: {data?.product_id}
                </span>
                <p className="w-full my-5 leading-7">{data?.content}</p>
                <div className="flex mb-3 ">
                  <p className="text-zinc-500 text-sm mr-3">
                    Available: {data?.stock}
                  </p>
                  <p className="text-zinc-500 text-sm">Solds: {data?.sold}</p>
                </div>
                <p className="text-2xl font-bold">$ {data?.price}</p>
                {data && (
                  <div className="xs:mt-5 sm:mt-20 md:mt-5 lg:mt-20 xl:mt-20">
                    <button className="bg-zinc-900 px-10 py-2.5 text-white mr-5 hover:bg-zinc-700 duration-150">
                      Add to cart
                    </button>
                    <button className=" p-2.5 ">
                      <span className="border-b-2 border-zinc-900 pb-1">
                        Add to wish list
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-center flex-col mt-10">
              <h2 className="text-2xl mb-5">Some products related</h2>
              <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                {relateds.slice(0, 4).map((product) => (
                  <VerticalProductCard key={product._id} {...product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProductDetail;
