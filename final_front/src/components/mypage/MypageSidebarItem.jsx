import React, { useState } from "react";
import Menu from "../sidebar/Menu";
import "../../styles/mypage.css";


const MypageSidebarItem = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState([
    "회원정보수정",
    "비밀번호변경",
    "배송지관리",
    "SNS연결설정",
    "로그인관리",
    "회원탈퇴",
  ]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="MenuList">
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
          {/* 회원정보수정 탭 내용 */}
          {/* 메뉴 내용을 원하는 형식으로 수정하세요 */}
          <div className="link Menu aTag">
            <img
              className="icon image20"
              src={"../logos/" + items[activeTab] + ".png"}
              alt={items[activeTab]}
            />
            <div className="TextBox">
              <span className="menuLIst">{items[activeTab]}</span>
            </div>
          </div>
        </div>
      )}
      {items[activeTab] === "비밀번호변경" && (
        <div className="Menu">
          {/* 비밀번호변경 탭 내용 */}
          {/* 메뉴 내용을 원하는 형식으로 수정하세요 */}
          <div className="link Menu aTag">
            <img
              className="icon image20"
              src={"../logos/" + items[activeTab] + ".png"}
              alt={items[activeTab]}
            />
            <div className="TextBox">
              <span className="menuLIst">{items[activeTab]}</span>
            </div>
          </div>
        </div>
      )}
      {/* 나머지 탭들에 대해서도 동일하게 추가하세요 */}
    </div>
  </div>
);
};
export default MypageSidebarItem;