import React from "react";
import UserProfile from "../UserProfile";

const ChatList = ({ _userData }) => {
  // console.log(_userData);
  // console.log(_userData.memberId);
  return (
    <>
      <img
        id="profile"
        className="icon_black image40"
        style={{ borderRadius: "50%" }}
        src={
          _userData &&
          (_userData.memberProfileImage ?? "../logos/PROFILE.png")
        }
      />
      <span className="black">
        {_userData.memberNickname ?? "알 수 없음"}
        {/* <br />
        {_userData.msg ?? "채팅 메시지"} */}
      </span>
    </>
  );
};

export default ChatList;
