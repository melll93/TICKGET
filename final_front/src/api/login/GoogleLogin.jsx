import React from "react";
import { useNavigate } from "react-router-dom";
import { loginGoogle } from "../../util/authLogic";
import { GoogleLoginButton } from "react-google-login";

const GoogleLogin = ({ authLogic }) => {
  const navigate = useNavigate();

  const responseGoogle = async (res) => {
    try {
      const result = await loginGoogle(
        authLogic.getUserAuth(),
        authLogic.getGoogleAuthProvider()
      );
      const { uid, name, email } = result;
      const member = {
        memberId: uid,
        memberName: name,
        memberEmail: email,
      };
      // member 정보를 서버에 전송하는 코드 추가
      console.log(member);
      // navigate("/");
    } catch (error) {
      console.log("로그인 오류입니다");
    }
  };

  return (
    <>
      <GoogleLoginButton
        clientId={process.env.FIREBASE_API_KEY}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </>
  );
};

export default GoogleLogin;
