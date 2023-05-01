package back.spring.final_back.chat.repository;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChatMessageDto {
    private int chatMsgNo;
    private int chatRoomNo;
    private String chatMsgWriter;
    private Timestamp chatMsgTime;
    private String chatMsgContent;

}
