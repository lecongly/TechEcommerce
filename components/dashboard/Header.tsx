import {
  FiCreditCard,
  FiPackage,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import { IoAnalyticsOutline } from "react-icons/io5";
import { viewOptions } from "../../interfaces/adminViewOptions";

interface Props {
  view: string;
  setView: (arg: viewOptions) => void;
}

const routes = [
  { name: viewOptions.USERS, icon: <FiUsers /> },
  { name: viewOptions.PAYMENTS, icon: <FiCreditCard /> },
  { name: viewOptions.CATEGORIES, icon: <FiShoppingBag /> },
  { name: viewOptions.PRODUCTS, icon: <FiPackage /> },
  { name: viewOptions.ANALYTICS, icon: <IoAnalyticsOutline /> },
];

const AdminHeader = ({ view, setView }: Props) => {
  return (
    <nav className="max-w-screen-xl mx-auto grid grid-cols-5 border-y-3 rounded-2xl overflow-hidden border-teal-500">
      {routes.map((route) => (
        <button
          key={route.name}
          onClick={() => setView(route.name)}
          className={`flex items-center justify-start px-5 py-3
          ${
            view === route.name
              ? "bg-teal-500 text-white rounded-xl"
              : "bg-transparent"
          }`}
        >
          <span className="text-2xl mr-2 ">{route.icon}</span>
          <span className="text-base font-textMedium">{route.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default AdminHeader;
