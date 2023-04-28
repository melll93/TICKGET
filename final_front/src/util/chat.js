export const chat = (client, room) => {
  client.connect({}, () => {
    client.subscribe("/sub/message/" + room, (e) => {
      // console.log("event => ", e)

      console.log(e.body);

      const jsonMsg = JSON.parse(e.body);

      const id = jsonMsg.id;
      const room = jsonMsg.room;
      const content = jsonMsg.content;

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
    });
  });
};
