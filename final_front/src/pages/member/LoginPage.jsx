import React, { useEffect } from "react";
import NaverLogin from "../../api/login/NaverLoginCallback";
import Sidebar from "../../components/Sidebar";

const LoginPage = ({ user, setUserInfo }) => {

  return (
    <><Sidebar />
      <div className="center">
        <div className="login">
          <NaverLogin user={user} setUserInfo={setUserInfo} />
        </div>
      </div>
    </>);
};

export default LoginPage;
