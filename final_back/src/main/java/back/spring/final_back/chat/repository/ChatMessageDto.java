package back.spring.final_back.chat.repository;

import lombok.Data;

@Data
public class ChatMessageDto {
    private int chatRoomNo;
    private String chatMsgWriter;
    private String chatMsgContent;
}
