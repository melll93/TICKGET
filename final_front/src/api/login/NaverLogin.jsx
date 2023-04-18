import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendNaverMember } from "../../axios/member/socialLogin";
const { naver } = window;
const NAVER_CLIENT_ID = "3fiEhnoQMSqSfg5o2LKi";
const NAVER_CALLBACK_URL = encodeURI(
  "http://localhost:3333/oauth/login/naver/callback"
);

const NaverLogin = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleNaverLogin = () => {
    const btnNaverLogin = document.querySelector("#naverIdLogin").firstChild;
    btnNaverLogin.click();
  };

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 60 },
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        setUser(naverLogin.user);
        console.log(naverLogin.user);
        await sendMemberData(naverLogin.user).then((res) => {
          console.log(res);
          const loginStatus = res.data.result;
          if (loginStatus === 0) {
            // 자체 회원가입 안되어있다면 login failed
            console.log(loginStatus);
            navigate("/socialregister");
          } else if (loginStatus === 1) {
            // 자체 회원가입 되어있다면
            // res.data.member를 redux로 회원정보 저장,
            // login success => home
            console.log(loginStatus);
            navigate("/");
          }
        });
      }
    });
  };

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    window.localStorage.setItem("login_domain", "naver");
  };

  const sendMemberData = async (user) => {
    const member = {
      id: user.id,
      name: user.name,
      age: user.age,
      birthday: user.birthday,
      birthyear: user.birthyear,
      email: user.email,
      gender: user.gender,
      nickname: user.nickname,
      profile_image: user.profile_image,
    };
    const result = await sendNaverMember(member);
    return result;
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);

  return (
    <>
      <div id="naverIdLogin" style={{ display: "none" }}></div>
      <div className="loginbutton">
        <img
          src="logos/naver/btnG_아이콘원형.png"
          onClick={handleNaverLogin}
          style={{ cursor: "pointer" }}
        />
      </div>
    </>
  );
};

export default NaverLogin;
