package back.spring.final_back.chat.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/pub")
    public String message(String message) throws Exception {
        JsonParser ps = new JsonParser();
        JsonObject jsonMsg = (JsonObject) ps.parse(message);

        String id = jsonMsg.get("id").toString();
        int room = Integer.parseInt(jsonMsg.get("room").toString());
        String content = jsonMsg.get("content").toString();

        log.info(id + ":" + content);
        template.convertAndSend("/sub/message/" + room, message);

        return message;
    }
}
