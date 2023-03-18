import React from "react";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";

const Profile = () => {
  return (
    <div className="Profile">
      <Link to="/mypage">
        <img className="icon image50" src={"logos/PROFILE.png"} />
      </Link>
      <ProfileButton />
    </div>
  );
};

export default Profile;
