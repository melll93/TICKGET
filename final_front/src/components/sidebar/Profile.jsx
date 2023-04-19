import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reduxLogin } from "../../redux/userAuth/action";
import { Cookies } from "react-cookie";
import { Dropdown } from "react-bootstrap";
const cookies = new Cookies();

const Profile = () => {
  const reduxUser = useSelector((state) => state.userStatus.user);
  const _userData = cookies.get("_userData");
  const naver_token = window.localStorage.getItem("com.naver.nid.access_token");
  const access_token = window.localStorage.getItem("access_token");

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    cookies.remove("_userData");
    // navigate("/"); // cookie가 갱신이 안됨
    window.location.href = "/";
  };

  /********************************************
   * 로그인 시 발급된 jwt를 가지고 BE에 요청
   ********************************************/
  const getUserData = async () => {
    const token = window.localStorage.getItem("access_token");
    const result = await axios({
      method: "POST",
      url: "http://localhost:8888" + "/member/getMemberData",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      const _userData = res.data;
      cookies.set("_userData", _userData);
    });
    return result;
  };

  const handleChatFromProfile = () => {
    navigate("/chat");
  };

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
      console.log(_userData);
      return (
        <>
          {/* 프로필 버튼 시작 */}
          <div
            className="profile msg"
            style={{ textAlign: "center", padding: "0 auto" }}
          >
            <span>{_userData && _userData.memberNickname}님 환영합니다.</span>
          </div>
          <div className="ProfileBox">
            <div className="userImage">
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  id="profile-dropdown"
                  style={{ border: "none" }}
                >
                  <img
                    id="profile"
                    className="icon image40"
                    style={{ borderRadius: "50%" }}
                    // src="https://phinf.pstatic.net/contact/20230416_257/1681630347916iq32w_PNG/avatar_profile.png?type=s160"
                    src={
                      _userData &&
                      (_userData.memberProfileImage ?? "../logos/PROFILE.png")
                    }
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown items">
                  <Dropdown.Item onClick={handleChatFromProfile}>
                    1:1 채팅
                  </Dropdown.Item>
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
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    access_token && getUserData().then(console.log);
  }, []);

  return getProfile();
};

export default Profile;
