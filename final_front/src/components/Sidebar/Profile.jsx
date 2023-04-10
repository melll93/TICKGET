import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const reduxUser = useSelector(state => state.userStatus.user);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const getUser = () => {
    if (reduxUser != {} || reduxUser != null) {
      console.log(reduxUser);
    }
  }
  // const getProfile = async () => {
  //   if (window.localStorage.getItem("login_domain") === "kakao") {
  //     try {
  //       let data = await window.Kakao.API.request({
  //         url: "/v2/user/me",
  //       });
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getUser();
    // getProfile();
    // console.log(reduxUser);
  }, []);
  return (
    <div className="Profile">
      <Link to="/mypage">
        <img className="icon image50" src={"../logos/PROFILE.png"} />
      </Link>
      <div className="ProfileButton">
        <Link to="/login" className="link">
          <span>로그인</span>
        </Link>
        <br />
        <Link to="/register" className="link">
          <span>회원가입</span>
        </Link>
        <br />
        <Link to="/" className="link" onClick={logout}>
          <span>로그아웃</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
