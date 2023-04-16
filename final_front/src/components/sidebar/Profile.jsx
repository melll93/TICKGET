import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reduxLogin } from "../../redux/userAuth/action";
import { Cookies } from "react-cookie";
import { Dropdown } from "react-bootstrap";

const cookies = new Cookies();

const Profile = () => {
  const _userData = cookies.get("_userData");
  const access_token = window.localStorage.getItem("access_token");
  console.log(access_token);
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.clear();
    cookies.remove("_userData");
    // navigate("/"); // cookie가 갱신이 안됨
    window.location.href = "/";
  };

  const handleChatFromProfile = () => {
    navigate("/chat")
  }

  const getProfile = () => {
    if (!_userData && access_token === null) {
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
          {/* 프로필 버튼 시작 */}
          <div className="userImage">
            <Dropdown>
              <Dropdown.Toggle variant="none" id="profile-dropdown" style={{ border: "none" }}>
                <img
                  id="profile"
                  className="icon image40"
                  style={{ borderRadius: "50%" }}
                  src="https://phinf.pstatic.net/contact/20230416_257/1681630347916iq32w_PNG/avatar_profile.png?type=s160"
                // src={_userData.profile_img ?? "../logos/PROFILE.png"}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown items">
                <Dropdown.Item onClick={handleChatFromProfile}>1:1 채팅</Dropdown.Item>
                <Dropdown.Item>프로필</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-3"></Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* 프로필 버튼 끝 */}

          <br />
          <div className="ProfileButton">
            <Link to="/" className="link" onClick={logout}>
              <span>로그아웃</span>
            </Link>
            <br />
            <Link to="/mypage" className="link">
              <span>마이페이지</span>
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="ProfileBox">
        {getProfile()}
      </div>
    </>
  );
};

export default Profile;
