import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../../context/User.Context";
import { ProductInterface } from "../../interfaces/products";

const WishlistCard = (product: ProductInterface) => {
  const { image, name, product_id, description, stock, _id, price } = product;
  const { removeProductFromWishList, addToCart } = useContext(UserContext);
  return (
    <div className="">
      <div className="flex items-center justify-center aspect-square">
        <Image src={image.url} alt={product_id} width={680} height={680} />
      </div>
      <h2 className="mt-2 text-lg font-textMedium tracking-wide">{name}</h2>
      <h4 className="text-sm font-textRegular text-zinc-400">
        Ref: {product_id}
      </h4>
      <span className="">$ {price}</span>
      <div className="w-full relative flex items-center justify-center flex-row gap-5 mt-3">
        <button
          className="rounded-md border-2 border-zinc-100 text-zinc-400 hover:bg-black hover:text-white duration-300 w-full py-2.5 flex items-center justify-center text-base"
          onClick={() => addToCart({ ...product, quantity: 1 })}
        >
          Add to cart
        </button>
        <button
          className="rounded-md border-2 border-zinc-100 text-zinc-400 hover:bg-red-500 hover:text-white duration-300 w-full py-2.5 flex items-center justify-center text-base"
          onClick={() => removeProductFromWishList(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
