import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/mypage.css";
import { Box, Tab, Tabs, Typography } from "@mui/material";


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
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 250, display: "inline-block" }}>
          <Tabs value={value} onChange={handleChange}
            aria-label="scrollable prevent tabs example"
            orientation="vertical">
            <Tab label="내 게시글" value="one" />
            <Tab label="팔로우" value="two" />
            <Tab label="회원정보 수정" value="three" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2, display: "inline-block" }}>
          {value === "one" && (
            <Box>
              <Typography>
                The first tab
                {/* 내 게시글 창 컴포넌트로 붙이기 */}
              </Typography>
            </Box>
          )}
          {value === "two" && (
            <Box>
              <Typography>
                The second tab
                {/* 팔로우 창 컴포넌트로 붙이기 */}
              </Typography>
            </Box>
          )}
          {value === "three" && (
            <Box>
              <Typography>
                The third tab
                {/* 회원정보 수정창 컴포넌트로 붙이기 */}
              </Typography>
            </Box>
          )}
        </Box>
      </div >
    </>
  );
};

export default MyPage;
