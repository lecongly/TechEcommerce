import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import Summary from "../components/cart/Summary";
import CartCard from "../components/cart/CartCard";
import { UserContext } from "../context/User.Context";

const Cart = () => {
  const { push } = useRouter();
  const { cart, isAdmin, isLogged, cartTotal } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged || isAdmin) push("/");
  }, [isAdmin, isLogged, push]);

  return (
    <Layout title="Cart - TechEcommerce">
      <section className="max-w-screen-2xl mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <div className="mb-5">
            <h1 className="text-3xl tracking-wide font-textMedium mb-2">
              Shopping Cart
            </h1>
            <span className="text-sm text-neutral-500">
              You have {cart.length} {cart.length === 1 ? "tem" : "items"} on
              your cart
            </span>
          </div>
          {cart.map((cart) => (
            <CartCard key={cart._id} {...cart} />
          ))}
        </div>
        <Summary cart={cart} total={cartTotal} />
      </section>
    </Layout>
  );
};

export default Cart;
