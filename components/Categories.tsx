import { useContext } from "react";

import Loader from "./Loader";
import { CategoryInterface } from "../interfaces/categories";
import { AppContext } from "../context/AppContext";

interface Props {
  category: CategoryInterface;
  setCategory: (arg: CategoryInterface) => void;
}

const Categories = ({ category, setCategory }: Props) => {
  const { categoriesContent } = useContext(AppContext);
  const { categories, categoriesLoading } = categoriesContent;

  return (
    <div className="lg:col-span-3 xl:col-span-3 w-full">
      {categoriesLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <span className="mb-5 text-xl font-textMedium block xs:text-center sm:text-center md:text-left lg:text-left xl:text-left">
            Categories
          </span>
          <button
            className={`w-full py-2 flex items-center justify-start border-t-2 border-b-2 border-transparent hover:border-zinc-100 text-base  ${
              category._id === "1"
                ? "border-zinc-400 hover:border-zinc-400 font-textMedium "
                : "font-textRegular"
            }
            `}
            onClick={() =>
              setCategory({
                name: "All",
                _id: "1",
                createdAt: new Date().toLocaleDateString(),
                updatedAt: new Date().toLocaleDateString(),
              })
            }
          >
            All
          </button>
          {categories?.map((item) => (
            <button
              key={item._id}
              className={`w-full py-2 flex items-center justify-start border-t-2 border-b-2 border-transparent hover:border-zinc-100 text-base ${
                category._id === item._id
                  ? "border-zinc-400 hover:border-zinc-400 font-textMedium "
                  : "font-textRegular"
              }
              `}
              onClick={() => setCategory({ ...item })}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
