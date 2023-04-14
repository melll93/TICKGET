import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reduxLogin } from "../../redux/userAuth/action";

const Profile = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.userStatus.isLogin);
  const reduxUser = useSelector((state) => state.userStatus.user);
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    dispatch(reduxLogin({}));
    // window.location.reload();
    // navigate("/");
    window.location.href = "/"
  };

  const getProfile = () => {
    if (loginStatus === false) {
      return (
        <div className="ProfileButton">
          <Link to="/login" className="link">
            <span>로그인</span>
          </Link>
          <br />
          <Link to="/register" className="link">
            <span>회원가입</span>
          </Link>
        </div>
      );
    } else {
      console.log(reduxUser);
      return (
        <>
          <Link to="/mypage">
            {/* 프로필 이미지 버튼 */}
            <img
              id="profile"
              className="profile"
              src={reduxUser.profile_img ?? "../logos/PROFILE.png"}
            />
          </Link>
          <br />
          <div className="ProfileButton">
            <Link to="/" className="link" onClick={logout}>
              <span>로그아웃</span>
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div id="ProfileBox" className="ProfileBox">
        {getProfile()}
      </div>
    </>
  );
};

export default Profile;
