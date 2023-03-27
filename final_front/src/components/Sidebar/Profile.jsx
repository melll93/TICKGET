import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate()
  const logout = () => {
    window.localStorage.clear()
    navigate("/")
  };

  return (
    <div className="Profile">
      <Link to="/mypage">
        <img className="icon image50" src={"../logos/PROFILE.png"} />
      </Link>
      <div className="ProfileButton">
        <Link to="/login" className="link"><span>로그인</span></Link><br />
        <Link to="/join" className="link"><span>회원가입</span></Link><br />
        <Link to="/" className="link" onClick={logout}>
          <span>로그아웃</span>
        </Link>
      </div>
    </div >
  );
};

export default Profile;
