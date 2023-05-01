import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/chat.css";
import ChatList from "../../components/chat/ChatList";
import { Cookies } from "react-cookie"
import { getChatByRoom, getChatRoomList } from "../../axios/chat/chat";
import { searchById } from "../../axios/member/member";
import { setRoom } from "../../redux/chatStatus/action";

// const sock = new SockJS("http://localhost:8888/stompTest");
// const client = Stomp.over(sock);

const cookies = new Cookies();

/******************************************************************
 * @param msg 객체 리터럴로 user, msg, time 받아서 10~20개 정도 시간별 출력,
 * [{},{}, ...] for 문 돌려서 user가 본인이면 오른쪽, 아니라면 왼쪽 출력
 * chatBox 안에 chatText, profile, time
******************************************************************/
const ChatPage = ({ client }) => {
  const _userData = cookies.get("_userData")
  const nickname = _userData && _userData.memberNickname;
  const userId = _userData && _userData.memberId
  const room = useSelector((state) => state.chatStatus.room);
  const dispatch = useDispatch();

  const [roomUserData, setRoomUserData] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  const [msg, setMsg] = useState({
    id: userId,
    nickname: nickname,
    room: currentRoom,
    content: ""
  });

  // BE로 전송하는 메시지는 id로, 화면에 출력하는 메시지는 nickname으로
  const send = (msg) => {
    client.send('/pub', {}, JSON.stringify(msg));
    document.querySelector("#msg").value = "";
  };

  const renderOldChat = (room) => {
    document.querySelector("#outputBox").innerHTML = ''
    getChatByRoom(room).then(data => {
      // console.log(data);

      /*************** 채팅 박스 구현 ***************/
      for (let i = 0; i < data.length; i++) {
        const chatBox = document.createElement("div"); // 한 줄 담기 (세로 사이즈 조정)
        const chat = document.createElement("div"); // 컴포 디비전 좌우 처리
        chat.setAttribute("class", "chatText"); // 프로필 사진도 chat처럼 디비전 만들어서 추가하기
        const id = data[i].chatMsgWriter
        const content = data[i].chatMsgContent

        console.log(id);
        searchById(id).then(console.log)
        if (id === _userData.memberId) {
          chatBox.setAttribute("class", "myChat");
          chat.innerHTML = content + ":" + nickname;
        } else {
          chatBox.setAttribute("className", "otherChat");
          chat.innerHTML = nickname + ":" + content;
        }
        chatBox.appendChild(chat);
        document.querySelector("#outputBox").appendChild(chatBox);
      }
      /*************** 채팅 박스 구현 ***************/

    })
  }

  const renderChatRoomList = () => {
    // console.log(roomUserData);
    return (
      roomUserData && roomUserData.map((item, index) => (
        <div key={index} className="chatOne" style={{ cursor: "pointer" }}
          onClick={(e) => {
            dispatch(setRoom(item.chatRoomNo))
            setCurrentRoom(room)
            renderOldChat(item.chatRoomNo)
          }}>
          <ChatList key={index} _userData={item} />
        </div>
      ))
    )
  }

  useEffect(() => {
    const temp = []
    getChatRoomList()
      .then((roomList) => {
        roomList.map((room, index) => (
          searchById(room.chatRoomMember)
            .then(userData => {
              temp.push({ ...userData, ...room })
              return temp
            })
            // .then(setRoomUserData) // 에러 발생 코드
            .then((temp) => {
              temp.length === roomList.length && setRoomUserData(temp)
              // 비동기로 처리되다보니 한 개, 두 개 일 때 setState를 해버려 렌더링 시 원치 않는 상태에서 렌더링이 끝남.
              // temp, 임시 배열이 완성 되었을 떄, temp.length === roomList.length 일 때, setState를 해줌으로써, 배열이 완성된 후 렌더링을 해줌.
            })
        ))
      })
  }, [])

  console.log(currentRoom);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        {/****************************** CHAT AREA START ******************************/}
        <div className="chat container">
          {/******************** START chat bar ********************/}
          {/* <div className="chat bar">
            <div className="chat bar dm">
              <span className="black">DM</span>
            </div>
            <div className="chat bar group">
              <span className="black">GROUP</span>
            </div>
          </div> */}
          {/******************** END of chat bar ********************/}
          {/******************** START chat box ********************/}
          <div className="chat box">
            {/* start chat chatList */}
            <div id="chatList" className="chat box chatList">
              {renderChatRoomList()}
            </div>
            {/* end of chat chatList */}

            {/* start chat chatDisplay */}
            <div className="chat box chatDisplay">
              {/* start chatDisplay outputBox */}
              <div
                id="outputBox"
                className="chat box chatDisplay outputBox"
              ></div>
              {/* end of chatDisplay outputBox */}
              {/* start chatDisplay inputBox */}
              <div className="chat box chatDisplay inputBox">
                <input
                  className="inputTextBox"
                  id="msg"
                  type="text"
                  onKeyUp={(e) => {
                    if (window.event.keyCode === 13) {
                      send(msg);
                    }
                  }}
                  onChange={(e) => setMsg({
                    ...msg,
                    room: currentRoom,
                    content: e.target.value
                  })}
                />
                <input
                  type="button"
                  className="inputButton"
                  id="inputButton"
                  onClick={(e) => {
                    e.preventDefault();
                    send(msg);
                  }}
                  value="send"
                />
              </div>
              {/* end of chatDisplay inputBox */}
            </div>
            {/* end of chat chatDisplay */}
          </div>
          {/******************** END of chat box ********************/}
        </div>
        {/* end of chat container */}
        {/****************************** CHAT AREA END ******************************/}
      </div>
      {/* end of div.center */}
    </>
  );
};

export default ChatPage;
