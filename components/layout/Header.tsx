import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiBriefcase } from "react-icons/fi";
import { BsBookmarkHeart } from "react-icons/bs";

const Header = () => {
  const isLogged = true;
  const isAdmin = false;
  return (
    <header className="max-w-screen-xl mx-auto h-24 relative flex flex-row items-center justify-between z-50">
      <Link href="/">
        <a className="font-textSemibold text-3xl">
          <Image src="/icon.svg" alt="icon" width={70} height={70} />
        </a>
      </Link>

      {!isLogged && (
        <div className="flex items-center justify-center">
          <button className="mr-3 text-sm">Sign In</button>
          <span className="h-5 w-0.5 rounded-xl bg-black" />
          <button className="ml-3 text-sm">Create account</button>
        </div>
      )}

      {isAdmin && isLogged && (
        <div className="flex items-center justify-center">
          <Link href={"/dashboard"}>
            <a className="ml-3 text-sm">Dashboard</a>
          </Link>
          <button className="ml-3 text-sm text-pink-500 border-2 px-2 py-1 rounded-sm border-pink-500 hover:bg-pink-500 hover:text-white duration-200">
            Sign out
          </button>
        </div>
      )}

      {!isAdmin && isLogged && (
        <div className="w-3/4 flex items-center justify-end">
          <div className="relative max-w-sm w-full ">
            <input
              className="bg-white border-2 border-zinc-200 w-full pl-3 pr-9 py-2 rounded-lg text-sm placeholder:tracking-widest tracking-widest font-textRegular"
              placeholder="Search..."
            />
            <span className="absolute top-2/4 -translate-y-2/4 right-3 text-xl text-gray-400">
              <FiSearch />
            </span>
          </div>

          <Link href="/wishlist">
            <div className="ml-3 relative text-black cursor-pointer">
              <span className="w-4 h-4 rounded-full border white border-pink-500 absolute top-0 right-0 text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-3xl text-pink-500">
                <BsBookmarkHeart />
              </span>
            </div>
          </Link>
          <button className="ml-3 text-sm text-pink-500 border-2 px-3 py-1.5  rounded-lg border-pink-500 hover:bg-pink-500 hover:text-white duration-200">
            Sign out
          </button>
          <Link href="/cart">
            <a className="h-24 aspect-square ml-3 rounded-b-3xl bg-neutral-900 text-white flex items-center justify-center">
              <div className="relative">
                <span className="w-4 h-4 rounded-full absolute top-0 right-0 text-xs bg-pink-500 flex items-center justify-center">
                  3
                </span>
                <span className="text-3xl">
                  <FiBriefcase />
                </span>
              </div>
            </a>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
