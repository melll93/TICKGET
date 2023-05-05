let currentSubscription;

const ChatSubscribe = (client, currentRoom, _userData) => {
  if (currentSubscription) {
    currentSubscription.unsubscribe();
  }
  console.log(currentRoom);
  client.connect({}, () => {
    currentSubscription = client.subscribe(
      "/sub/message/" + currentRoom.room,
      (e) => {
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
          chat.innerHTML =
            content +
            ":" +
            nickname +
            `<img
            id="profile"
            class="icon_black image40"
            style="border-radius: 50%"
            src=${_userData.memberProfileImage}
          />`;
        } else {
          chatBox.setAttribute("className", "otherChat");
          chat.innerHTML =
            `<img
            id="profile"
            class="icon_black image40"
            style="border-radius: 50%"
            src=${currentRoom.frImage}
          />` +
            currentRoom.frNickname +
            ":" +
            content;
        }
        chatBox.appendChild(chat);
        document.querySelector("#outputBox").appendChild(chatBox);
        /*************** 채팅 박스 구현 ***************/

        const opb = document.querySelector("#outputBox");
        opb.scrollTop = opb.scrollHeight;
      }
    );
  });

  console.log(currentRoom.room + "번방 연결 성공");
};

export default ChatSubscribe;
