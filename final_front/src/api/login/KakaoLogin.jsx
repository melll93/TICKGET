import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  // const CLIENT_ID = "6a3741ce2b33e194c3e799c86fdc2cb2";
  const CLIENT_ID = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = "http://localhost:3333/oauth/login/kakao/callback";
  const GRANT_TYPE = "authorization_code";

  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [userNickname, setUserNickname] = useState();
  const [userImage, setUserImage] = useState();

  let params = new URL(document.location).searchParams;
  let code = params.get("code");

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: GRANT_TYPE,
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: code,
    });

    try {
      const res = await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        data: payload,
      });

      // window.Kakao.init("91cd3ddbc6f115bd43e18b4c229ffd2b");
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
      console.log(res.data.access_token);
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      window.localStorage.setItem("access_token", res.data.access_token);
      window.localStorage.setItem("login_domain", "kakao");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // setUserId(data.id);
      // window.localStorage.setItem("userId", userId);
      // setUserNickname(data.properties.nickname);
      // window.localStorage.setItem("userNickname", userNickname);
      // setUserImage(data.properties.profile_image);
      // window.localStorage.setItem("userImage", userImage);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const kakaoLogout = async () => {
    //insert here 로그아웃 처리
    await axios({
      method: "GET",
      url: `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=http://localhost:3000/`,
    })
      .then((res) => {
        console.log(res);
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("userNickname");
        window.localStorage.removeItem("userImage");
        // window.Kakao.Auth;
        // window.localStorage.clear();
        navigate("/");
      })
      .catch(console.log);
  };

  useEffect(() => {
    getToken();
  }, []);

  return <div>code : {code}</div>;
};

export default KakaoLogin;
