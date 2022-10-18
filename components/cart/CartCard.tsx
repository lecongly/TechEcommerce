import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartInterface } from "../../interfaces/userContext";
import { GrClose } from "react-icons/gr";
import { UserContext } from "../../context/User.Context";

const CartCard = ({
  description,
  image,
  name,
  _id,
  product_id,
  price,
  quantity,
}: CartInterface) => {
  const { decrementQuantity, incrementQuantity, removeProductFromCart } =
    useContext(UserContext);

  const [totalProduct, setTotalProduct] = useState<number>(0);

  useEffect(() => {
    const total = price * quantity;
    setTotalProduct(total);
  }, [quantity, price]);

  return (
    <div className="overflow-hidden border-2 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-2.5 mb-5 last:mb-0 rounded-2xl bg-white">
      <div className="col-span-7 grid grid-cols-5 gap-5">
        <div className="col-span-2 flex items-center justify-center">
          <Image
            className="w-full h-full aspect-square"
            src={image.url}
            alt={product_id}
            width={680}
            height={680}
            objectFit="contain"
          />
        </div>
        <div className="col-span-3 flex flex-col items-start justify-center ">
          <h2 className="text-2xl font-textMedium mb-2">{name}</h2>
          <span className="text-sm font-textRegular text-neutral-400 mb-2">
            Ref: {product_id}
          </span>
          <span className="text-sm font-textRegular text-neutral-400 mb-5">
            {description}
          </span>
          <span className="font-textRegular text-sm">${price} usd.</span>
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <button
            className="h-9 w-9 rounded-md text-3xl flex items-center justify-center mr-3 hover:bg-zinc-50 duration-200 hover:border-2 border-transparent hover:border-zinc-200"
            onClick={() => decrementQuantity(_id)}
          >
            -
          </button>

          <span className="text-lg font-textSemibold bg-neutral-100 h-9 w-9 rounded-md border-2 flex items-center justify-center">
            {quantity <= 9 && "0"}
            {quantity}
          </span>
          <button
            className="h-9 w-9 rounded-md text-3xl flex items-center justify-center ml-3 hover:bg-zinc-50 duration-200 hover:border-2 border-transparent hover:border-zinc-200"
            onClick={() => incrementQuantity(_id)}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full col-span-2 relative flex flex-col items-center justify-center">
        <button
          className="flex items-center justify-center text-xl border-2 border-zinc-100 hover:border-zinc-300 duration-300 h-10 w-10"
          onClick={() => removeProductFromCart(_id)}
        >
          <GrClose />
        </button>
        <span className="mt-5 font-textSemibold text-xl">${totalProduct}</span>
      </div>
    </div>
  );
};

export default CartCard;
