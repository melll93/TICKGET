import axios from "axios"

export const createChatRoom = async (myId, friendId) => {
    const result = await axios({
        method: "POST",
        url: "http://localhost:8888"
            // +process.env.BACKEND_URL 
            + "/chat/createChatRoom",
        data: {
            myId: myId,
            friendId: friendId
        }

    }).then(console.log)
}