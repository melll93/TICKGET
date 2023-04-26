package back.spring.final_back.chat.service;

import java.util.Map;

public interface ChatService {
    int createChatRoom(String[] members);
    Map<String, Object> getChatRoomList();
}
