package back.spring.final_back.chat.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatDao {
    public int createChatRoom(int roomNo, String memberId);
    public List<ChatRoomDto> getChatRoomList(String memberId);
    public int selectMaxRoomNo();
    public int addChat(ChatMessageDto chatMessageDto);
    public String getRecentChat(int roomNo);

    List<ChatMessageDto> getChatByRoom(int roomNo);
}
