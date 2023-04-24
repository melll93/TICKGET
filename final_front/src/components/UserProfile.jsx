import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { createChatRoom } from "../axios/chat/Chat";
import { addFollowDB, checkFollowDB } from "../axios/member/member";
const cookies = new Cookies();

const UserProfile = ({ _userData }) => {
  const navigate = useNavigate();
  const _myData = cookies.get("_userData");

  const myId = _myData && _myData.memberId;
  const friendId = _userData && _userData.memberId;
  // console.log(_userData);

  const [isFollow, setIsFollow] = useState(false)

  const handleChatFromProfile = (myId, friendId) => {
    console.log(myId);
    console.log(friendId);
    createChatRoom(myId, friendId)
    navigate("/chat");
  };

  const renderFollow = () => {
    let part;
    if (!isFollow) { // 팔로우 중이 아니라면
      part = <Dropdown.Item onClick={(e) => handleFollow(friendId)}>팔로우</Dropdown.Item>
    } else { // 이미 팔로우하는 대상이라면
      part = <Dropdown.Item onClick={(e) => handleFollow(friendId)}>팔로우 취소</Dropdown.Item>
    }

    return part
  }

  // ifAlreayFollow : true, or false
  const checkFollow = (friendId) => {
    console.log("check");
    checkFollowDB(friendId).then(setIsFollow);
  }

  const handleFollow = (friendId) => {
    if (!isFollow) { // 팔로우 중이 아니라면,
      addFollowDB(friendId)
    } else { // 이미 팔로우하는 대상이라면
      // deleteFollowDB(friendId)
      //console.log('이승현 바보');
      //console.log('이승현 바보');  

    }
  }

  useEffect(() => {
    _userData && checkFollow(friendId)
  }, [isFollow])

  return (
    <div className="userImage">
      <Dropdown>
        <Dropdown.Toggle
          variant="none"
          id="profile-dropdown"
          style={{ border: "none" }}
        >
          <img
            id="profile"
            className="icon_black image40"
            style={{ borderRadius: "50%" }}
            // src="https://phinf.pstatic.net/contact/20230416_257/1681630347916iq32w_PNG/avatar_profile.png?type=s160"
            src={
              _userData &&
              (_userData.memberProfileImage ?? "../logos/PROFILE.png")
            }
          />
        </Dropdown.Toggle>
        <Dropdown.Menu id="dropdown" className="dropdown items">
          {(myId === friendId) ? null :
            <Dropdown.Item
              onClick={(e) =>
                handleChatFromProfile(myId, friendId)
              }>
              1:1 채팅
            </Dropdown.Item>
          }

          <Dropdown.Item>프로필</Dropdown.Item>

          {(myId === friendId) ? null : renderFollow()}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
};

export default UserProfile;
