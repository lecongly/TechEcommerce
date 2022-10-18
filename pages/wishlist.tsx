import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import WishlistCard from "../components/wishlist/WishlistCard";
import Layout from "../components/layout";
import { UserContext } from "../context/User.Context";

const WishList = () => {
  const { push } = useRouter();

  const { wishList, isLogged, isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged || isAdmin) push("/");
  }, [isAdmin, isLogged, push]);
  return (
    <Layout title="Wish list - TechEcommerce">
      <div className="max-w-screen-2xl mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:11/12 flex flex-col items-center justify-between py-5 mb-10">
        <h1 className="text-3xl font-textMedium text-gray-900">Wish List</h1>
        <span className="text-sm">
          {wishList.length === 0
            ? "You have not items yet in wish list."
            : `${wishList.length} ${wishList.length === 1 ? "Item" : "Items"}`}
        </span>
      </div>
      <section className="max-w-screen-2xl content mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 grid grid-cols-4 gap-5">
        {wishList.map((item) => (
          <WishlistCard key={item._id} {...item} />
        ))}
      </section>
    </Layout>
  );
};

export default WishList;
