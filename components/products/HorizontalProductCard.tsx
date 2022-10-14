import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ProductInterface } from 'interfaces/products';

const HorizontalProductCard = ({ _id, product_id, image, name, stock, price, content, sold }: ProductInterface) => {
  const [currentHover, setCurrentHover] = useState<string | null>(null);
  return (
    <Link href={`/${_id}`}>
      <a
        className="w-full grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-3 mb-5"
        onMouseEnter={() => setCurrentHover(_id)}
        onMouseLeave={() => setCurrentHover(null)}
      >
        <div className="xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-4 xl:col-span-1 ">
          <Image
            className={`rounded-lg duration-200 ${currentHover === _id ? 'scale-105 ' : 'scale-100'}`}
            src={image.url}
            alt={product_id}
            width={680}
            height={680}
            objectFit="contain"
            quality={100}
          />
        </div>
        <div className="xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-5 xl:col-span-2 w-full p-5">
          <h4 className="text-xl font-bold">{name}</h4>
          <span className="text-sm text-zinc-500">Ref: {product_id}</span>
          <p className="my-3 leading-7">{content}</p>
          <div className="flex flex-col items-start justify-center text-zinc-500">
            <p className="text-sm">
              Stock:
              <span className="ml-2 font-supremeBold tracking-wide">{stock}</span>
            </p>
            <p className="text-base font-supremeRegular">
              Solds:
              <span className="ml-2 font-supremeBold tracking-wide">{sold}</span>
            </p>
          </div>
          <div className="flex items-center justify-start mt-6">
            <p className="text-2xl font-bold">${price}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default HorizontalProductCard;
