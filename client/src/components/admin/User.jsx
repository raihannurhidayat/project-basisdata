import React, { useEffect, useState } from "react";
import { deleteApiUserByAdmin, getApiAllUsers } from "../../service/api/User";
import Loading from "../Loading";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUser = async () => {
    try {
      setIsLoading(true);
      const response = await getApiAllUsers();
      setUsers(response.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserByAdmin = async (slug) => {
    try {
      setIsLoading(true);
      const resposne = await deleteApiUserByAdmin(slug);
      getAllUser();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {isLoading ? (
        <Loading />
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Staff
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.username}
                </th>
                <td className="px-6 py-4">{item.email}</td>
                {item.is_staff ? (
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Staff
                    </div>
                  </td>
                ) : (
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                      No Staff
                    </div>
                  </td>
                )}
                {/* <td className="px-6 py-4">{item.answers_false}</td>
                  <td className="px-6 py-4">{item.n_cheating}</td>
                  <td className="px-6 py-4">{item.student_grade_final}</td> */}

                <td className="px-6 py-4 flex gap-4">
                  <div
                    href="#"
                    className="font-medium text-white dark:text-blue-500 cursor-pointer inline bg-red-600 py-2 px-3 rounded-sm"
                    onClick={() => {
                      deleteUserByAdmin(item.slug);
                    }}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
