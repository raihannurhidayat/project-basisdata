import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getApiUserDetails,
  updateApiUserDetails,
} from "../../service/api/User";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from "../../assets/default-profile.jpg";
import axios from "axios";

const MySwal = withReactContent(Swal);

const ProfileUpdate = () => {
  const [userInfo, setUserInfo] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profile_picture_url, setProfile_picture_url] = useState("");
  const [birth_date, setBirth_date] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const { slug } = useParams();

  const navigate = useNavigate();

  const getUserDetails = async () => {
    const response = await getApiUserDetails(slug);
    console.log(response);
    setUserInfo(response);
    setUsername(response.username);
    setBio(response.user_bio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username || userInfo.username);
    formData.append("user_bio", bio || userInfo.user_bio || null);
    formData.append(
      "profile_picture_url",
      profile_picture_url || userInfo.profile_picture_url || null
    );

    try {
      const response = await updateApiUserDetails(slug, formData);
      console.log(response);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.profile_picture_url[0]);
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

  useEffect(() => {
    if (isError) {
      MySwal.fire({
        title: "Oops!",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        setIsError(false);
      });
    }
  }, [isError]);

  return (
    <div className="bg-white min-h-screen rounded-md">
      <div className="flex justify-center flex-col items-center w-3/4 mx-auto py-12">
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-white bg-white shadow-lg flex justify-center items-center m">
          <img
            src={userInfo?.profile_picture_url ? `http://localhost:8000${userInfo?.profile_picture_url}` : logo}
            alt="Profile"
            className="w-full h-full object-cover"
          />
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
            <label htmlFor="picture" className="text-xl">
              Picture
            </label>
            <input
              name="picture"
              id="picture"
              type="file"
              className="file-input w-full max-w-xs"
              onChange={(e) => setProfile_picture_url(e.target.files[0])}
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
