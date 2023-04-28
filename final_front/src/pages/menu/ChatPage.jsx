import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/chat.css";
import UserProfile from "../../components/UserProfile";
import ChatList from "../../components/chat/ChatList";
import { Cookies } from "react-cookie"
import { Stomp } from "@stomp/stompjs"

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
  const username = _userData && _userData.memberNickname;
  const userId = _userData && _userData.memberId

  const [room, setRoom] = useState(1)

  const [msg, setMsg] = useState({
    id: userId,
    room: room,
    content: ""
  });

  client.connect({}, () => {
    client.subscribe('/sub/message/' + room, (e) => {
      // console.log("event => ", e)

      console.log(e.body);

      const jsonMsg = JSON.parse(e.body)

      const id = jsonMsg.id
      const room = jsonMsg.room
      const content = jsonMsg.content

      /*************** 채팅 박스 구현 ***************/
      const chatBox = document.createElement("div"); // 한 줄 담기 (세로 사이즈 조정)
      const chat = document.createElement("div"); // 컴포 디비전 좌우 처리
      chat.setAttribute("class", "chatText"); // 프로필 사진도 chat처럼 디비전 만들어서 추가하기
      // for
      // if (msg.user === 'ADMIN') { // user 이름 받아서
      chatBox.setAttribute("class", "myChat");
      // } else {
      //   chatbox.setAttribute('className', 'otherChat')
      // }

      chat.innerText = id + ":" + content;
      chatBox.appendChild(chat);
      document.querySelector("#outputBox").appendChild(chatBox);
      /*************** 채팅 박스 구현 ***************/
    })
  })


  // BE로 전송하는 메시지는 id로, 화면에 출력하는 메시지는 nickname으로
  const send = (msg) => {
    // console.log(sock.readyState);
    // if (sock.readyState === 1) {

    client.send('/pub', {}, JSON.stringify(msg));

    setMsg({
      id: userId,
      room: 1,
      content: ""
    });
    document.querySelector("#msg").value = "";
    // }
  };

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
            <div className="chat box chatList">
              <ChatList />
              <ChatList />
              <ChatList />
              <ChatList />
              <ChatList />
              <ChatList />
              <ChatList />
              <ChatList />
              <ChatList />
              <ChatList />
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
