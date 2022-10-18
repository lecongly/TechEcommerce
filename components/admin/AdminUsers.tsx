import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import UserCard from "./UserCard";

const AdminUsers = () => {
  const { users } = useContext(AdminContext);
  return (
    <div className="mt-4 overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              <div className="flex items-center gap-2">ID</div>
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              <div className="flex items-center gap-2">Name</div>
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              <div className="flex items-center gap-2">Email</div>
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              <div className="flex items-center gap-2">Role</div>
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users?.map((user) => (
            <UserCard key={user._id} {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
