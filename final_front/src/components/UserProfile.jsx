import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { createChatRoom } from "../axios/chat/chat.js";
import { addFollowDB, checkFollowDB } from "../axios/member/member";
import { useDispatch } from "react-redux";
import { setRoom } from "../redux/chatStatus/action.js";
const cookies = new Cookies();

const UserProfile = ({ _userData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const _myData = cookies.get("_userData");

  const myId = _myData && _myData.memberId;
  const friendId = _userData && _userData.memberId;
  // console.log(_userData);

  const [isFollow, setIsFollow] = useState()

  const handleChatFromProfile = (myId, friendId) => {
    console.log(myId);
    console.log(friendId);
    const members = [myId, friendId]
    createChatRoom(members)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setRoom(res.data))
        }
      })
      .then((res) => {
        navigate("/chat")
      })
  };

  const renderFollow = (isFollow) => {
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
    checkFollowDB(friendId).then(setIsFollow);
  }

  const handleFollow = (friendId) => {
    if (!isFollow) { // 팔로우 중이 아니라면,
      addFollowDB(friendId)
    } else { // 이미 팔로우하는 대상이라면
      // deleteFollowDB(friendId)

    }
  }

  useEffect(() => {
    if (_userData && myId !== friendId) {
      checkFollow(friendId)
    }
    renderFollow()
  }, [])

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
            src={
              _userData &&
              (_userData.memberProfileImage ?? "../logos/PROFILE.png")
            }
          />
        </Dropdown.Toggle>
        {(myId === friendId) ?
          <Dropdown.Menu id="dropdown" className="dropdown items">
            <Dropdown.Item
              onClick={(e) =>
                navigate("/mypage")
              }>
              마이페이지
            </Dropdown.Item>
          </Dropdown.Menu>
          :
          <Dropdown.Menu id="dropdown" className="dropdown items">
            {
              <Dropdown.Item
                onClick={(e) =>
                  handleChatFromProfile(myId, friendId)
                }>
                1:1 채팅
              </Dropdown.Item>
            }

            <Dropdown.Item>프로필</Dropdown.Item>

            {renderFollow(isFollow)}
          </Dropdown.Menu>}
      </Dropdown>
    </div>
  )
};

export default UserProfile;
