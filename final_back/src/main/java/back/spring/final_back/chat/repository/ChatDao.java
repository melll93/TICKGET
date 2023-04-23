package back.spring.final_back.chat.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface ChatDao {
    public Map<String, Object> getChatRoom(String memberId);
}
