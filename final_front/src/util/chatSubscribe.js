import { Cookies } from "react-cookie";

const cookies = new Cookies();
const _userData = cookies.get("_userData");
let currentSubscription;

const ChatSubscribe = (client, room) => {
  if (currentSubscription) {
    currentSubscription.unsubscribe();
  }

  client.connect({}, () => {
    currentSubscription = client.subscribe("/sub/message/" + room, (e) => {
      console.log(e.body);

      const jsonMsg = JSON.parse(e.body);

      const id = jsonMsg.id;
      const nickname = jsonMsg.nickname;
      const room = jsonMsg.room;
      const content = jsonMsg.content;

      /*************** 채팅 박스 구현 ***************/
      const chatBox = document.createElement("div"); // 한 줄 담기 (세로 사이즈 조정)
      const chat = document.createElement("div"); // 컴포 디비전 좌우 처리

      chat.setAttribute("class", "chatText"); // 프로필 사진도 chat처럼 디비전 만들어서 추가하기
      // for
      if (id === _userData.memberId) {
        chatBox.setAttribute("class", "myChat");
        chat.innerHTML = content + ":" + nickname;
      } else {
        chatBox.setAttribute("className", "otherChat");
        chat.innerHTML = nickname + ":" + content;
      }
      chatBox.appendChild(chat);
      document.querySelector("#outputBox").appendChild(chatBox);
      /*************** 채팅 박스 구현 ***************/

      const opb = document.querySelector("#outputBox");
      opb.scrollTop = opb.scrollHeight;
    });
  });

  console.log(room + "번방 연결 성공");
};

export default ChatSubscribe;
