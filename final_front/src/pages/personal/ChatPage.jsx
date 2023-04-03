import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const ws = new WebSocket("ws://localhost:8888/ws/chat");

const ChatPage = () => {
  const username = "ADMIN";
  const [msg, setMsg] = useState("");

  const send = (msg) => {
    console.log("send");
    if (ws.readyState === ws.OPEN) {
      console.log(username + ":" + msg);
      ws.send(username + ":" + msg);
      setMsg("");
    }
  };

  //채팅창에 들어왔을 때
  const onOpen = (evt) => {
    const str = username + ": 님이 입장하셨습니다.";
    ws.send(str);
    console.log("onOpen");
  };

  //채팅창에서 나갔을 때
  const onClose = (evt) => {
    const str = username + ": 님이 방을 나가셨습니다.";
    ws.send(str);
    console.log("onClose");
  };

  useEffect(() => {
    ws.onopen = onOpen;
    ws.onclose = onClose;
  }, []);

  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <input id="msg" type="text" onChange={(e) => setMsg(e.target.value)} />
        <input
          type="button"
          onClick={(e) => {
            e.preventDefault();
            send(msg);
          }}
          value="send"
        />
      </div>
    </>
  );
};

export default ChatPage;
