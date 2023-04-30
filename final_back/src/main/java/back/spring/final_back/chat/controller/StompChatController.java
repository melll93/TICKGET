package back.spring.final_back.chat.controller;

import back.spring.final_back.chat.repository.ChatMessageDto;
import back.spring.final_back.chat.service.ChatService;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template;
    private final ChatService chatService;

    @MessageMapping("/pub")
    public String message(String message) throws Exception {
        JsonParser ps = new JsonParser();
        JsonObject jsonMsg = (JsonObject) ps.parse(message);
        
        String id = jsonMsg.get("id").getAsString();
        int room = Integer.parseInt(jsonMsg.get("room").toString());
        String content = jsonMsg.get("content").getAsString();

        log.info(id);
        log.info(content);
        template.convertAndSend("/sub/message/" + room, message);

        ChatMessageDto msgDto = new ChatMessageDto();
        msgDto.setChatRoomNo(room);
        msgDto.setChatMsgWriter(id);
        msgDto.setChatMsgContent(content);
        chatService.addChat(msgDto);

        return message;
    }


}
