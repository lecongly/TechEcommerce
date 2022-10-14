import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductInterface } from "../../interfaces/products";

const VerticalProductCard = ({
  _id,
  image,
  name,
  price,
  stock,
  description,
}: ProductInterface) => {
  const [currentHover, setCurrentHover] = useState<string | null>(null);

  return (
    <Link href={`/${_id}`}>
      <a
        onMouseEnter={() => setCurrentHover(_id)}
        onMouseLeave={() => setCurrentHover(null)}
        className="bg-white overflow-hidden rounded-xl border-2 border-gray-50"
      >
        <div className="w-full  overflow-hidden flex items-center justify-center">
          <Image
            className={`duration-200 
            ${currentHover === _id ? "scale-105 " : "scale-100"}`}
            src={image.url}
            alt={name}
            width={680}
            height={680}
            objectFit="contain"
            quality={100}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center p-3">
          <h4 className="w-full text-base font-bold tracking-wide mb-3">
            {name}
          </h4>
          <p className="w-full text-sm font-normal mb-3 h-10">{description}</p>
          <p className="w-full text-xs font-normal">${price}</p>
        </div>
      </a>
    </Link>
  );
};

export default VerticalProductCard;
