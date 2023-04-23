import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/mypage.css";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ReservationPage from "./ReservationPage";


const MyPage = () => {
  // one : 내가 쓴 게시물
  // two : 팔로워
  // three : 회원정보 수정
  const [value, setValue] = useState("one")

  const handleChange = (e, value) => {
    console.log(value);

    setValue(value)
  }
  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <ReservationPage />
      </div >
    </>
  );
};

export default MyPage;
