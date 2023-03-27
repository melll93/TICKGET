import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { naver } = window;
const NAVER_CLIENT_ID = "3fiEhnoQMSqSfg5o2LKi";
const NAVER_CALLBACK_URL = encodeURI(
  "http://localhost:3333/oauth/login/naver/callback"
);

const NaverLogin = ({ user, setUserInfo }) => {
  const navigate = useNavigate();

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 50 },
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const userId = naverLogin.user.id;
        const userEmail = naverLogin.user.email;
        const userName = naverLogin.user.name;
        console.log(userId);
        console.log(userName);
        console.log(userEmail);
        console.log(naverLogin.user);
        setUserInfo(naverLogin.user);
        // setUserObject(user);
      }
    });
  };

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    navigate("/");
  };

  const sendToken = async (user) => {
    const result = await axios({
      method: "POST",
      url: "http://localhost:8888/oauth/login/naver/callback",
      data: user,
    });
    // .then(console.log)
    // .catch((error) => console.log(error))
    return result;
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
    // sendToken(userObject).then(console.log)
  }, []);

  return (
    <>
      <div className="loginbutton" id="naverIdLogin">
        {" "}
      </div>
    </>
  );
};

export default NaverLogin;
