import { CartInterface } from "../../interfaces/userContext";

interface Props {
  cart: CartInterface[];
  total: number;
}
const Summary = ({ cart, total }: Props) => {
  return (
    <div className="bg-zinc-50 aspect-square p-5 flex flex-col justify-between items-center rounded-lg">
      <div className="w-full">
        <h1 className="text-2xl tracking-wide font-textMedium pb-5 mb-10 border-b-2">
          Summary
        </h1>
        <p className="uppercase text-lg font-textMedium tracking-wide mb-2.5">
          Items {cart.length}
        </p>
        <p>Shipping are free.</p>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between border-t-2 pt-5 mb-5">
          <p className="uppercase font-supremeBold">Total </p>
          <p className="uppercase font-supremeBold">${total}</p>
        </div>
        <div className="">Checkout</div>
      </div>
    </div>
  );
};

export default Summary;
