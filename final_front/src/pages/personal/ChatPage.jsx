import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/chat.css";

const ws = new WebSocket("ws://localhost:8888/ws/chat");

const ChatPage = () => {
  const username = "ADMIN";
  const [msg, setMsg] = useState("");

  const send = (msg) => {
    if (ws.readyState === ws.OPEN) {
      console.log("send");
      console.log(username + ":" + msg);
      ws.send(username + ":" + msg);
      setMsg("");
    } else {
      console.log("서버에 연결되지 않았습니다.");
    }
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
              <div className="chat box chatDisplay outputBox"></div>
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
