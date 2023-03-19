import React, { useEffect, useState } from "react";
import NaverLogin from "../../components/login/NaverLogin";
import Sidebar from "../../components/Sidebar";

const LoginPage = ({ user, setUserInfo }) => {
  useEffect((user) => { console.log(user) }, [user])
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
