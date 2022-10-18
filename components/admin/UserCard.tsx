import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { User } from "../../interfaces/userContext";
const UserCard = ({ _id, name, email, role }: User) => {
  const { deleteUser } = useContext(AdminContext);
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {_id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{name}</td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{email}</td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {role === 1 ? "Admin" : "User"}
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <strong
          className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 cursor-pointer"
          onClick={() => deleteUser(_id)}
        >
          Delete
        </strong>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View
        </a>
      </td>
    </tr>
  );
};

export default UserCard;
