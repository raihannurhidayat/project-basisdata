import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaDonate } from "react-icons/fa";
import axios from "axios";
import Loading from "./Loading";
import { MdCreate } from "react-icons/md";
import { useInfoRole, useInfoUser } from "../hooks/useInfoUser";
import Search from "./Search";
import { searchApiPost } from "../service/api/posts";
import Posts from "./Posts";
import { MdAdminPanelSettings } from "react-icons/md";
import { isAdminApiCheck } from "../service/api/User";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [postIsNotFound, setPostIsNotFound] = useState(false);
  const [postSearchTemp, setPostSearchTemp] = useState("");
  const [messageIsError, setMessageIsError] = useState("");
  const [isRole, setIsRole] = useState({});

  const search = true;

  const navigate = useNavigate();

  const { slug } = useInfoUser();

  const searchPost = async () => {
    setPostIsNotFound(false);
    try {
      const response = await searchApiPost(postSearchTemp, "posts");
      setPost(response.results);
      console.log(response);
    } catch (error) {
      console.log(error);
      setPostIsNotFound(true);
      setMessageIsError(error.response.data.detail);
    } finally {
      setPostSearchTemp("");
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout/",
        "",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      localStorage.clear();
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const isAdminCheck = async () => {
  //   const response = await isAdminApiCheck();
  //   setIsRole({
  //     is_staff: response.is_staff,
  //     is_superuser: response.is_superuser,
  //   });
  // };
  const infoRole = useInfoRole();
  
  useEffect(() => {
    // isAdminCheck();
  }, [infoRole?.is_staff]);


  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-white mx-8 mt-4 py-3 px-12 rounded-md">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold italic">SHIL.IT</h1>
              <Link
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                <IoSearch size={30} />
              </Link>
              <Link to="/threds">
                <TiHome size={30} />
              </Link>
              <Link to="/threds/create">
                <MdCreate size={30} />
              </Link>
              <Link to={`/profile/${slug}`}>
                <FaUserAlt size={30} />
              </Link>
              {infoRole.is_staff ? (
                <Link to={'/admin'}>
                  <MdAdminPanelSettings size={30} />
                </Link>
              ) : (
                <Link to={"https://saweria.co/widgets/qr?streamKey=5ccd417d63379d1fed7883eada98af21"}>
                  <FaDonate size={30} />
                </Link>
              )}

              <Link onClick={handleLogout}>
                <RiLogoutBoxRFill size={30} />
              </Link>
            </div>

            <dialog id="my_modal_2" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h1>Search Post</h1>
                <Search
                  searchThred={searchPost}
                  searchTemp={postSearchTemp}
                  setSearchTemp={setPostSearchTemp}
                  type={"Posts"}
                />
                {post.length > 0 && !postIsNotFound ? (
                  <>
                    {post?.map((item, index) => (
                      <div key={index}>
                        <Posts display="profile" posts={item} search={search} />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <h1>{messageIsError}</h1>
                  </>
                )}
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
