import React from "react";
import UserProfile from "../UserProfile";

const ChatList = (_userData) => {
  return (
    <div className="chatOne">
      <UserProfile _userdata={"test"} />
      <span className="black">
        {_userData.memberId ?? "알 수 없음"}
        <br />
        {_userData.msg ?? "채팅 메시지"}
      </span>
    </div>
  );
};

export default ChatList;
