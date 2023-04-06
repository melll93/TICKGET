import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/chat.css";

// const ws = new WebSocket("ws://localhost:8888/ws/chat");
// const ws = new SockJS("http://localhost:8888/ws/chat", null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] })
const ws = new SockJS("http://localhost:8888/ws/chat");

/******************************************************************
 * @param msg 객체 리터럴로 user, msg, time 받아서 10~20개 정도 시간별 출력,
 * [{},{}, ...] for 문 돌려서 user가 본인이면 오른쪽, 아니라면 왼쪽 출력
 * chatBox 안에 chatText, profile, time
 ******************************************************************/
const ChatPage = () => {
  const userStatus = useSelector((state) => state.userStatus)

  const username = userStatus.user.nickname;
  const [msg, setMsg] = useState({});

  const send = (msg) => {
    console.log("send");
    console.log(username + ":" + msg);
    ws.send(username + ":" + msg);

    const msg_payload = {
      id: username,
      room: 1,
      msg: msg,
    }
    ws.send(msg_payload)
    console.log(msg_payload);

    /*************** 채팅 박스 구현 ***************/
    const chatBox = document.createElement('div') // 한 줄 담기 (세로 사이즈 조정)
    const chat = document.createElement('div') // 컴포 디비전 좌우 처리
    chat.setAttribute('class', 'chatText') // 프로필 사진도 chat처럼 디비전 만들어서 추가하기
    // for
    // if (msg.user === 'ADMIN') { // user 이름 받아서 
    chatBox.setAttribute('class', 'myChat')
    // } else {
    //   chatbox.setAttribute('className', 'otherChat')
    // }

    chat.innerText = msg
    chatBox.appendChild(chat)
    document.querySelector('#outputBox').appendChild(chatBox)
    /*************** 채팅 박스 구현 ***************/

    setMsg({});
    document.querySelector('#msg').value = ""
  };

  const onOpen = (e) => {
    const str = username + "님이 입장하셨습니다.";
    ws.send(str);
    console.log("onOpen");
  };

  const onClose = (e) => {
    const str = username + "님이 방을 나가셨습니다.";
    ws.send(str);
    console.log("onClose");
  };

  ws.onopen = (ws, e) => {
    onOpen(e);
  };

  ws.onclose = (ws, e) => {
    onClose(e);
  };

  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        {/****************************** CHAT AREA START ******************************/}
        <div className="chat container">
          {/******************** START chat bar ********************/}
          <div className="chat bar">
            <div className="chat bar dm">
              <span>DM</span>
            </div>
            <div className="chat bar group">
              <span>GROUP</span>
            </div>
          </div>
          {/******************** END of chat bar ********************/}
          {/******************** START chat box ********************/}
          <div className="chat box">
            {/* start chat chatList */}
            <div className="chat box chatList">
              <li>chatList</li>
            </div>
            {/* end of chat chatList */}

            {/* start chat chatDisplay */}
            <div className="chat box chatDisplay">
              {/* start chatDisplay outputBox */}
              <div id="outputBox" className="chat box chatDisplay outputBox"></div>
              {/* end of chatDisplay outputBox */}
              {/* start chatDisplay inputBox */}
              <div className="chat box chatDisplay inputBox">
                <input
                  className="inputTextBox"
                  id="msg"
                  type="text"
                  onChange={(e) => setMsg(e.target.value)}
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
