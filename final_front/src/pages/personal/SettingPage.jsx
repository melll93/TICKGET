import React, { useState } from "react";
import Menu from "../../components/sidebar/Menu";
import "../../styles/mypage.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Tab1Content from "../../components/mypage/Tab1Content";
import Tab2Content from "../../components/mypage/Tab2Content";
import Tab3Content from "../../components/mypage/Tab3Content";
import UnRegiesterPage from "./UnRegiesterPage";
import MemberUpdPage from "./MemberUpdPage";
import Tab4_ProfileChange from "../../components/mypage/Tab4_ProfileChange";


const MypageSidebarItem = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState([
    "회원정보수정",
    "비밀번호변경",
    "배송지관리",
    "프로필변경",
    "SNS연결설정",
    "로그인관리",
    "회원탈퇴",
  ]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
    <Header />
    <Sidebar />
    <div className="center">

    <div className="MypageTabList">
    <div className="TabList">
      {items.map((item, index) => (
        <div
          key={index}
          className={activeTab === index ? "TabItem active" : "TabItem"}
          onClick={() => handleTabClick(index)}
        >
            <img
              className="mypage_tab_icon"
              src={"../logos/" +item+ ".png"}
              alt={item}
            />{item}
        </div>
      ))}
    </div>
    <div className="TabContent">
      {/* 각 탭별 내용을 추가하세요 */}
      {items[activeTab] === "회원정보수정" && (
        <div className="Menu">
    
{/* <Tab1Content></Tab1Content> */}
<MemberUpdPage/>

        </div>
      )}
      {items[activeTab] === "비밀번호변경" && (
        <div className="TabContent">

{/*여기  */}
비밀번호변경
<Tab2Content></Tab2Content>
        </div>
      )}

{items[activeTab] === "배송지관리" && (
        <div className="TabContent">

{/*여기  */}
배송지관리
<Tab3Content></Tab3Content>
        </div>
      )}


{items[activeTab] === "프로필변경" && (
        <div className="TabContent">

{/*여기  */}
<Tab4_ProfileChange></Tab4_ProfileChange>
        </div>
      )}



{items[activeTab] === "SNS연결설정" && (
        <div className="TabContent">

{/*여기  */}
sns연결설정
        </div>
      )}

{items[activeTab] === "로그인관리" && (
        <div className="TabContent">

{/*여기  */}
로그인관리
        </div>
      )}
{items[activeTab] === "회원탈퇴" && (
        <div className="Menu">

{/*여기  */}
회원탈퇴
<UnRegiesterPage></UnRegiesterPage>
        </div>
      )}
    </div>
  </div>
  </div>
  </>
);
};
export default MypageSidebarItem;