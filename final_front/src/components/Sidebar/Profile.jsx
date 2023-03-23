import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const naverLogout = () => {
    localStorage.removeItem("com.naver.nid.access_token");
    localStorage.removeItem("com.naver.nid.oauth.state_token");
    window.location.reload();
  };
  return (
    <div className="Profile">
      <Link to="/mypage">
        <img className="icon image50" src={"../logos/PROFILE.png"} />
      </Link>
      <div className="ProfileButton">
        <Link to="/login" className="link"><span>로그인</span></Link><br />
        <Link to="/join" className="link"><span>회원가입</span></Link><br />
        <Link to="/" className="link" onClick={naverLogout}>
          <span>로그아웃</span>
        </Link>
      </div>
    </div >
  );
};

export default Profile;
