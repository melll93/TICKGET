package back.spring.final_back.chat.service;

import java.util.Map;

public interface ChatService {
    int createChatRoom(Map<String, String> chatMember);
    Map<String, Object> getChatRoom();
}
