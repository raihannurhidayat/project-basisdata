import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getApiUserDetails } from "../../service/api/User";
import bg from "../../assets/bg.jpg";
import profile from "../../assets/logo-unsil.png";
import {
  deleteApiThredByUser,
  getApiThredByUser,
} from "../../service/api/Threds";
import logoChat from "../../assets/logo-chat.png";
import { formatDistanceToNow } from "date-fns";
import { FaRegTrashCan } from "react-icons/fa6";
import Loading from "../../components/Loading";
import Paginate from "../../components/Paginate";

const Profile = () => {
  const { slug } = useParams();

  const [userInfo, setUserInfo] = useState();
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isPagination, setIsPagination] = useState(true);
  const [threds, setThreds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, SetCount] = useState(0);

  const getUserDetails = async () => {
    const response = await getApiUserDetails(slug);
    setUserInfo(response);
  };

  const getThredByUser = async () => {
    const response = await getApiThredByUser(slug);
    console.log(response);
    SetCount(response.count);
    setThreds(response.results);
    setNextPage(response.next);
    setPrevPage(response.previous);
    setIsPagination(true);
    setPage(1);
  };

  const handleDelete = async (slugThred) => {
    try {
      setIsLoading(true);
      const response = await deleteApiThredByUser(slugThred);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      getThredByUser();
    }
  };

  useEffect(() => {
    getUserDetails();
    getThredByUser();
  }, []);

  return (
    <div className="bg-[#76ABAE] min-h-screen rounded-md pb-24">
      {/* profile start */}
      <div className="relative">
        <div
          className="h-[190px] bg-cover bg-center rounded-md"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        ></div>

        <div className="absolute inset-0 flex justify-center items-center top-32 md:top-48 z-50">
          <img
            src={profile}
            alt="Profile"
            className="w-[174px] rounded-full border-4 border-white bg-white shadow-lg"
          />
        </div>
      </div>
      <div className="flex justify-center items-center z-10">
        <div className="text-center mt-16 bg-white pt-[96px] px-20 absolute top-[222px] rounded-md pb-8">
          <h1 className="text-2xl font-bold">{userInfo?.username}</h1>
          <p className="text-gray-600">{userInfo?.user_bio}</p>
          <Link to={`/profile/update/${slug}`} className="btn btn-outline btn-primary mt-2">Update</Link>
        </div>
      </div>
      {/* profile end */}

      {/* info activity start */}
      <div className="mx-80 mt-64 mb-36">
        <div className="flex justify-between">
          <div className="bg-[#D9D9D9] py-8 px-10 flex flex-col items-center justify-center rounded-xl">
            <h1 className="font-bold text-3xl">{count}</h1>
            <p>Thred</p>
          </div>
          <div className="bg-[#D9D9D9] py-8 px-10 flex flex-col items-center justify-center rounded-xl">
            <h1 className="font-bold text-3xl">1000</h1>
            <p>Post</p>
          </div>
        </div>
      </div>
      {/* info activity end */}

      {/* table start */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className=" mx-52 bg-[#222831] text-white">
            <table className="table-auto mx-auto border-collapse w-full">
              <thead className="text-left">
                <tr>
                  <th
                    className="border w-3/4 border-white px-2 py-1"
                    colSpan={2}
                  >
                    Active Topics
                  </th>
                  <th className="border border-white px-2 py-1 text-center">
                    Topics
                  </th>
                  <th className="border border-white px-2 py-1 text-center">
                    Author
                  </th>
                  <th className="border border-white px-2 py-1 text-center">
                    Last Posts
                  </th>
                  <th className="border border-white px-2 py-1 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {threds.map((thred, index) => (
                  <tr key={index}>
                    <td className="border border-white px-2 py-1 w-1/12">
                      <img
                        className="mx-auto"
                        width={35}
                        src={logoChat}
                        alt="Logo Chat"
                      />
                    </td>
                    <td className="border border-white px-2 py-1">
                      <Link
                        to={`/threds/${thred.slug}`}
                        className="underline hover:text-blue-500 transition-all ease-in-out duration-300"
                      >
                        {thred.thread_name}
                      </Link>
                      <p>Title Threds</p>
                      <p>Category: education</p>
                    </td>
                    <td className="border border-white px-2 py-1 text-center">
                      {thred.category}
                    </td>
                    <td className="border border-white px-2 py-1 text-center">
                      {thred.created_by}
                    </td>
                    <td className="border border-white px-2 py-1 text-center">
                      {formatDistanceToNow(new Date(thred.created_at), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="border border-white px-2 py-1 text-center">
                      <div className="flex justify-center items-center">
                        <FaRegTrashCan
                          size={30}
                          className="cursor-pointer hover:text-red-500 transition-all ease-in-out duration-200"
                          onClick={() => handleDelete(thred.slug)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="my-3 flex justify-end mx-52">
              <Paginate
                nextPage={nextPage}
                setNextPage={setNextPage}
                prevPage={prevPage}
                setPrevPage={setPrevPage}
                page={page}
                setPage={setPage}
                setThreds={setThreds}
              />
            </div>
          </div>
        </>
      )}
      {/* table end */}
    </div>
  );
};

export default Profile;
