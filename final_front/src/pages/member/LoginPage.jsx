import React, { useEffect } from "react";
import NaverLogin from "../../api/login/NaverLogin";
import Sidebar from "../../components/Sidebar";

const LoginPage = ({ user, setUser }) => {
  const CALLBACK_URL = "http://localhost:3333/oauth/login/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${CALLBACK_URL}&response_type=code`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=6a3741ce2b33e194c3e799c86fdc2cb2&redirect_uri=${CALLBACK_URL}&response_type=code`;

  return (
    <>
      <Sidebar />
      <div className="center">
        <div className="login">
          <NaverLogin user={user} setUser={setUser} />
          <div className="loginbutton">
            <a href={KAKAO_AUTH_URL}>
              <img src="logos/kakao/kakao_login_medium_narrow.png" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
