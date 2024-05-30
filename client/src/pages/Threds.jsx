import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { formatDistanceToNow } from "date-fns";
import Search from "../components/Search";
import logoChat from "../assets/logo-chat.png";
import { Link } from "react-router-dom";
import { getApiAllThreds, searchApiThred } from "../service/api/Threds";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Paginate from "../components/Paginate";

const MySwal = withReactContent(Swal);

const Threds = () => {
  const [threds, setThreds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTemp, setSearchTemp] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [messageIsError, setMessageIsError] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isPagination, setIsPagination] = useState(true);

  const getAllTreds = async () => {
    try {
      setIsLoading(true);
      const response = await getApiAllThreds();
      setThreds(response.results);
      setNextPage(response.next);
      setPrevPage(response.previous);
      setIsPagination(true)
      setPage(1);
    } catch (error) {
      console.log(error);
      localStorage.clear();
    } finally {
      setIsLoading(false);
    }
  };

  const searchThred = async () => {
    try {
      setIsLoading(true);
      const resposne = await searchApiThred(searchTemp, "threads");
      setThreds(resposne.results);
      setIsPagination(false)
    } catch (error) {
      console.log(error);
      setMessageIsError(error.response.data.detail);
      setIsNotFound(true);
    } finally {
      setIsLoading(false);
      setSearchTemp("");
    }
  };

  useEffect(() => {
    getAllTreds();
  }, []);

  useEffect(() => {
    if (isNotFound) {
      MySwal.fire({
        title: "Oops!",
        text: messageIsError,
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        setIsNotFound(false);
      });
    }
  }, [isNotFound]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-end my-4">
            <h2 className="text-xl ">Board Index</h2>
            <Search
              searchTemp={searchTemp}
              searchThred={searchThred}
              setSearchTemp={setSearchTemp}
            />
          </div>

          <div className="my-4 text-white text-sm">
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
                </tr>
                <tr></tr>
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
                      <p>Category: education</p>
                    </td>
                    <td className="border border-white px-2 py-1 text-center">
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
                  </tr>
                ))}
              </tbody>
            </table>
            {isPagination && (
              <div className="my-3 flex justify-end">
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
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Threds;
