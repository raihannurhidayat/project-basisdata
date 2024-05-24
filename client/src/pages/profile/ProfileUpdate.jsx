import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getApiUserDetails,
  updateApiUserDetails,
} from "../../service/api/User";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from "../../assets/logo-unsil.png";

const MySwal = withReactContent(Swal);

const ProfileUpdate = () => {
  const [userInfo, setUserInfo] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profile_picture_url, setProfile_picture_url] = useState("");
  const [birth_date, setBirth_date] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  const { slug } = useParams();

  const navigate = useNavigate();

  const getUserDetails = async () => {
    const response = await getApiUserDetails(slug);
    setUserInfo(response);
    setUsername(response.username);
    setBio(response.user_bio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username || userInfo.username,
      profile_picture_url: profile_picture_url || null,
      user_bio: bio || null,
      birth_date: birth_date || null,
    };

    try {
      const response = await updateApiUserDetails(slug, data);
      console.log(response);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile Updated!",
        confirmButtonText: "OK",
      }).then(() => {
        setIsSuccess(false);
        navigate(`/profile/${slug}`);
      });
    }
  }, [isSuccess]);

  return (
    <div className="bg-white min-h-screen rounded-md">
      <div className="flex justify-center flex-col items-center w-3/4 mx-auto py-12">
        <div className="p-5 rounded-full border shadow-md my-2">
          <img src={logo} width={200} alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white w-2/4 flex flex-col justify-center mb-12"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={userInfo?.email}
              className="input input-bordered my-2 input-disabled"
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-xl">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              className="input input-bordered my-2"
              required
              value={username}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio" className="text-xl">
              Bio
            </label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              name="bio"
              id="bio"
              className="textarea textarea-bordered"
              value={bio}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-outline btn-primary my-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
