import { useContext } from "react";
import { TbLayoutGrid, TbLayoutList } from "react-icons/tb";
import { LayoutContext } from "../../context/LayoutContext";

const ProductView = () => {
  const { gridView } = useContext(LayoutContext);
  const { setIsGrid, isGrid } = gridView;
  return (
    <div className="w-full flex items-center justify-between mb-5">
      <div className="flex items-center justify-center">
        <span className="mr-3 font-textMedium text-sm uppercase">View</span>
        <button
          className={`w-8 h-8 flex items-center justify-center rounded-md border-2 mr-1 text-2xl 
        ${
          isGrid
            ? "text-zinc-900 border-zinc-900"
            : "text-zinc-400 border-zinc-400"
        } `}
          onClick={() => setIsGrid(true)}
        >
          <TbLayoutGrid />
        </button>
        <button
          className={`w-8 h-8 xs:hidden sm:hidden md:flex lg:flex xl:flex items-center justify-center rounded-md border-2 ml-1 text-2xl 
        ${
          !isGrid
            ? "text-zinc-900 border-zinc-900"
            : "text-zinc-400 border-zinc-400"
        } `}
          onClick={() => setIsGrid(false)}
        >
          <TbLayoutList />
        </button>
      </div>
    </div>
  );
};

export default ProductView;
