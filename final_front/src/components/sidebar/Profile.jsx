import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reduxLogin } from "../../redux/userAuth/action";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const Profile = () => {
  const _userData = cookies.get("_userData");
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.userStatus.isLogin);
  const reduxUser = useSelector((state) => state.userStatus.user);
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.clear();
    cookies.remove("_userData");
    // navigate("/"); // cookie가 갱신이 안됨
    window.location.href = "/";
  };

  const getProfile = () => {
    if (!_userData) {
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
      console.log(_userData);
      return (
        <>
          <Link to="/mypage">
            {/* 프로필 이미지 버튼 */}
            <img
              id="profile"
              className="image40"
              src={_userData.profile_img ?? "../logos/PROFILE.png"}
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
