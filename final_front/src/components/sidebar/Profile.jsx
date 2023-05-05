import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reduxLogin } from "../../redux/userAuth/action";
import { Cookies } from "react-cookie";
import { Dropdown } from "react-bootstrap";
import UserProfile from "../sidebar/UserProfile";
import { getUserData } from "../../axios/member/member";
const cookies = new Cookies();

const Profile = () => {
  const _userData = cookies.get("_userData");
  const naver_token = window.localStorage.getItem("com.naver.nid.access_token");
  const access_token = window.localStorage.getItem("access_token");

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("access_token");
    cookies.remove("_userData");
    // navigate("/"); // cookie가 갱신이 안됨
    window.location.href = "/";
  };

  /********************************************
   * 로그인 시 발급된 jwt를 가지고 BE에 요청
   ********************************************/
  // const getUserData = async () => {
  //   const token = window.localStorage.getItem("access_token");
  //   const result = await axios({
  //     method: "POST",
  //     url: "http://localhost:8888" + "/member/getMemberData",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => {
  //     const _userData = res.data;
  //     cookies.set("_userData", _userData);
  //   });
  //   return result;
  // };

  const getProfile = () => {
    // if (!_userData && naver_token === null) {
    if (access_token === null && naver_token === null) {
      return (
        <div className="ProfileBox">
          <div className="ProfileButton">
            <Link to="/login" className="link">
              <span>로그인</span>
            </Link>
            <br />
            <Link to="/register" className="link">
              <span>회원가입</span>
            </Link>
          </div>
        </div>
      );
    } else {
      // console.log(_userData); // 페이지 이동 시 마다 3번 요청됨****************
      return (
        <>
          <div
            className="profile msg"
            style={{ textAlign: "center", padding: "0 auto" }}
          >
            <span>{_userData && _userData.memberNickname}님 환영합니다.</span>
          </div>
          <div className="ProfileBox">
            {/* 프로필 이미지(드롭다운) */}
            <UserProfile _userData={_userData} />
            <br />

            {/* 프로필 버튼 시작 */}
            <div className="ProfileButton">
              <Link to="/" className="link" onClick={logout}>
                <span>로그아웃</span>
              </Link>
              <br />
              <Link to="/mypage" className="link">
                <span>마이페이지</span>
              </Link>
            </div>
            {/* 프로필 버튼 끝 */}
          </div>
        </>
      );
    }
  }; //end of getProfile

  useEffect(() => {
    access_token &&
      getUserData(access_token).then((res) => {
        console.log(res);
      });
  }, []);

  return getProfile();
};

export default Profile;
