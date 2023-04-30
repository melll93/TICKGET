package back.spring.final_back.chat.service;

import back.spring.final_back.chat.repository.ChatMessageDto;
import back.spring.final_back.chat.repository.ChatRoomDto;

import java.util.List;
import java.util.Map;

public interface ChatService {
    int createChatRoom(String[] members);
    List<ChatRoomDto> getChatRoomList();
    List<Map<String, Object>> getChatRoomListWithRecentChat();
    int addChat(ChatMessageDto chatMessageDto);
}
