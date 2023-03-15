import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="Profile">
      <Link to="/mypage">
        <div>
          <img className="image50" src={"logos/PROFILE.png"} />
        </div>
        <p>PROFILE</p>
      </Link>
    </div>
  );
};

export default Profile;
