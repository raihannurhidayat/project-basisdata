import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getApiUserDetails } from "../../service/api/User";
import bg from "../../assets/bg.jpg";
import profile from "../../assets/default-profile.jpg";
import {
  deleteApiThredByUser,
  getApiThredByUser,
  paginationApiPost,
  paginationApiThred,
} from "../../service/api/Threds";
import logoChat from "../../assets/logo-chat.png";
import { formatDistanceToNow, set } from "date-fns";
import { FaRegTrashCan } from "react-icons/fa6";
import Loading from "../../components/Loading";
import Paginate from "../../components/Paginate";
import { GrUpdate } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { format } from "date-fns";
import { getApiPostByUser } from "../../service/api/posts";
import { BsPencilSquare } from "react-icons/bs";
import { paginationApiGetPost } from "../../service/api/posts";
import Posts from "../../components/Posts";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Profile = () => {
  const { slug } = useParams();

  const [userInfo, setUserInfo] = useState();
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isPagination, setIsPagination] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsValue, setPostsValue] = useState([]);
  const [threds, setThreds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, SetCount] = useState(0);
  const [isStaff, setIsStaff] = useState(false);

  const [postCount, setPostCount] = useState(0);
  const [postPage, setPostPage] = useState(1);
  const [postNextPage, setPostNextPage] = useState(null);
  const [postPrevPage, setPostPrevPage] = useState(null);

  const navigate = useNavigate();

  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const getUserDetails = async () => {
    const response = await getApiUserDetails(slug);
    setIsStaff(response.is_staff);
    setUserInfo(response);
  };

  const getThredByUser = async () => {
    const response = await getApiThredByUser(slug);
    SetCount(response.count);
    setThreds(response.results);
    setNextPage(response.next);
    setPrevPage(response.previous);
    setIsPagination(true);
    setPage(1);
  };

  const getPostByUser = async () => {
    try {
      const response = await getApiPostByUser(slug);
      console.log(response);
      setPosts(response);
      setPostCount(response.count);
      setPostsValue(response.results);
      setPostNextPage(response.next);
      setPostPrevPage(response.previous);
    } catch (error) {
      console.log(error);
    }
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
    getPostByUser();
  }, []);

  return (
    <div className="bg-[#76ABAE] min-h-screen rounded-md pb-24">
      {/* profile start */}
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center top-32 md:top-48 z-50 bg-white">
          <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-white bg-white shadow-lg flex justify-center items-center">
            <img
              src={
                userInfo?.profile_picture_url
                  ? `http://localhost:8000${userInfo?.profile_picture_url}`
                  : profile
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center z-10">
        <div className="text-center mt-20 bg-white pt-[96px] px-20 absolute top-[222px] rounded-md pb-8">
          <div className="relative">
            <h1 className="text-2xl font-bold relative">
              {userInfo?.username}
              {isStaff && (
                <IoMdCheckmarkCircleOutline
                  size={22}
                  className="text-blue-700 absolute -top-1 right-14"
                />
              )}
            </h1>
          </div>
          <p className="text-gray-600">{userInfo?.user_bio}</p>
          {userInfo?.date_joined && (
            <div className="flex items-center justify-center gap-2">
              <div>
                <MdDateRange size={30} />
              </div>
              <p>
                Join {format(new Date(userInfo?.date_joined), "MMMM dd, yyyy")}
              </p>
              <Link
                to={`/profile/update/${slug}`}
                className="cursor-pointer hover:bg-teal-200 p-2 rounded-full transition-all ease-in-out duration-150"
              >
                <BsPencilSquare size={25} />
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* profile end */}

      {/* info activity start */}
      <div className="mx-80 mt-[470px] mb-24">
        <div className="flex justify-between">
          <div className="bg-[#D9D9D9] py-8 px-10 flex flex-col items-center justify-center rounded-xl">
            <h1 className="font-bold text-3xl">{count}</h1>
            <p>Thred</p>
          </div>
          <div className="bg-[#D9D9D9] py-8 px-10 flex flex-col items-center justify-center rounded-xl">
            <h1 className="font-bold text-3xl">{postCount}</h1>
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
          {threds.length > 0 ? (
            <>
              <h1 className="mx-40 text-2xl font-bold my-3">My Treads</h1>
              <div className="mx-40 bg-[#222831] text-white">
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
                          <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white shadow-lg flex justify-center items-center mx-auto">
                            <img
                              src={
                                thred.thread_picture_url
                                  ? `http://localhost:8000${thred.thread_picture_url}`
                                  : logoChat
                              }
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="border border-white px-2 py-1">
                          <Link
                            onClick={scrollTop}
                            to={`/threds/${thred.slug}`}
                            className="underline relative hover:text-blue-500 transition-all ease-in-out duration-300"
                          >
                            {thred.thread_name}
                            {thred.created_by.is_staff && (
                              <IoMdCheckmarkCircleOutline
                                size={22}
                                className="text-blue-700 absolute -top-1 -right-6"
                              />
                            )}
                          </Link>
                          <p>
                            {format(
                              new Date(thred.created_at),
                              "MMMM dd, yyyy"
                            )}
                          </p>
                        </td>
                        <td className="border border-white px-2 py-1 text-center capitalize">
                          {thred.category}
                        </td>
                        <td className="border border-white px-2 py-1 text-center">
                          {thred.created_by.username}
                        </td>
                        <td className="border border-white px-2 py-1 text-center">
                          {formatDistanceToNow(new Date(thred.created_at), {
                            addSuffix: true,
                          })}
                        </td>
                        <td className="border border-white px-2 py-1 text-center">
                          <div className="flex justify-center items-center gap-3">
                            <FaRegTrashCan
                              size={30}
                              className="cursor-pointer hover:text-red-500 transition-all ease-in-out duration-200"
                              onClick={() => handleDelete(thred.slug)}
                            />
                            <Link to={`/threds/update/${thred.slug}`}>
                              <BsPencilSquare
                                size={30}
                                className="cursor-pointer hover:text-yellow-500 transition-all ease-in-out duration-200"
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="my-3 flex justify-end mx-44">
                  <Paginate
                    nextPage={nextPage}
                    setNextPage={setNextPage}
                    prevPage={prevPage}
                    setPrevPage={setPrevPage}
                    page={page}
                    setPage={setPage}
                    setThreds={setThreds}
                    paginationApi={paginationApiThred}
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <h1 className="mx-40 text-2xl font-bold my-3">No Thread</h1>
            </div>
          )}
        </>
      )}
      {/* table end */}

      {/* data post start */}
      <div className="mx-40">
        {postsValue.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold">My Post</h1>
            <div>
              {postsValue?.map((post, index) => (
                <div key={index}>
                  <Posts
                    thread={post.thread}
                    display="profile"
                    posts={post}
                    getPost={getPostByUser}
                  />
                </div>
              ))}
              <div className="text-end">
                <Paginate
                  nextPage={postNextPage}
                  setNextPage={setPostNextPage}
                  prevPage={postPrevPage}
                  setPrevPage={setPostPrevPage}
                  page={postPage}
                  setPage={setPostPage}
                  setThreds={setPostsValue}
                  paginationApi={paginationApiGetPost}
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-2xl font-bold my-3">No Posts</h1>
          </div>
        )}
      </div>
      {/* data post end */}
    </div>
  );
};

export default Profile;
