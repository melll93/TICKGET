import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NaverLogin from "../../api/login/NaverLogin";
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
