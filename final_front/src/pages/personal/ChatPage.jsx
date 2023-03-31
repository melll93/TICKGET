import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";


const ChatPage = () => {
  const username = "asd";
  const websocket = new WebSocket("ws://localhost:8888/ws/chat");
  const [msg, setMsg] = useState("");
  websocket.onmessage = onMessage;

  useEffect(() => {
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
  }, [])

  const send = (msg) => {
    websocket.onopen = () => {
      console.log(username + ":" + msg);
      websocket.send(username + ":" + msg);
      setMsg("");
    }
  }

  //채팅창에서 나갔을 때
  function onClose(evt) {
    var str = username + ": 님이 방을 나가셨습니다.";
    websocket.send(str);
  }

  //채팅창에 들어왔을 때
  function onOpen(evt) {
    var str = username + ": 님이 입장하셨습니다.";
    websocket.send(str);
  }

  function onMessage(msg) {
    let sessionId = null;
    let message = null;
    const data = msg.data;
    const arr = data.split(":");

    for (var i = 0; i < arr.length; i++) {
      console.log('arr[' + i + ']: ' + arr[i]);
    }

    var cur_session = username;

    //현재 세션에 로그인 한 사람
    console.log("cur_session : " + cur_session);
    sessionId = arr[0];
    message = arr[1];

    console.log("sessionID : " + sessionId);
    console.log("cur_session : " + cur_session);
  }
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <input id="msg" type="text" onChange={e => setMsg(e.target.value)} />
        <input type="button" onClick={send(msg)} value="send" />
      </div>
    </>
  );
};

export default ChatPage;
