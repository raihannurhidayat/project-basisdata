import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getApiUserDetails } from "../../service/api/User";

const Profile = () => {
  const { slug } = useParams();

  const [userInfo, setUserInfo] = useState();

  const getUserDetails = async () => {
    const response = await getApiUserDetails(slug);
    console.log(response);
    setUserInfo(response);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="bg-white min-h-screen rounded-md">
      <div className="w-5/6 bg-green-200 min-h-screen mx-auto py-6">
        <h1>{userInfo?.username}</h1>
        <Link
          to={`/profile/update/${slug}`}
          className="btn btn-outline btn-secondary"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
