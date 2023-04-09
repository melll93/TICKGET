import React, { useState } from 'react'
import Menu from '../Sidebar/Menu';


const MypageSidebarItem = () => {
    const [items, setItems] = useState([
      "회원정보수정",
      "비밀번호변경",
      "배송지관리",
      "SNS연결설정",
      "로그인관리",
      "회원탈퇴",
    ]);
  
    return (
      <div className="MenuList">
        {items.map((item, index) => (
          <Menu key={index} item={item} />
        ))}
      </div>
    );
  };
  export default MypageSidebarItem;