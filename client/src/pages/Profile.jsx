import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { slug } = useParams();

  return (
    <div className="text-white">
      Profile
      {slug}
    </div>
  );
};

export default Profile;
