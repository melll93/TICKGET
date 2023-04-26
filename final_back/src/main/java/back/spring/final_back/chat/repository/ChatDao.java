package back.spring.final_back.chat.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface ChatDao {
    public int createChatRoom(int roomNo, String memberId);
    public Map<String, Object> getChatRoomList(String memberId);
    public int selectMaxRoomNo();
}
