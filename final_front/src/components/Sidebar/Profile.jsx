import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {

  const naverLogout = () => {
    localStorage.removeItem("com.naver.nid.access_token");
    localStorage.removeItem("com.naver.nid.oauth.state_token");
    window.location.reload();
  }

  return (
    <div className="Profile">
      <Link to="/mypage">
        <img className="icon image50" src={"logos/PROFILE.png"} />
      </Link>
      <div className='ProfileButton'>
        <div><Link to='/login'>로그인</Link></div>
        <div><Link to='/join'>회원가입</Link></div>
        <div><Link to='/' onClick={naverLogout}>로그아웃</Link></div>
      </div>
    </div>
  );
};

export default Profile;
