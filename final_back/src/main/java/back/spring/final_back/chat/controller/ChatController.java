package back.spring.final_back.chat.controller;

import back.spring.final_back.chat.repository.ChatRoomDto;
import back.spring.final_back.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3333")
@Controller
@ResponseBody
@Log4j2
@RequestMapping("/chat/*")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/get")
    public String chatGET() {

        log.info("@@@@@@@@@@@ChatController, chat GET()");
        return "chat";
    }

    @PostMapping("/createChatRoom")
    public int createChatRoom(@RequestBody String[] members) {
        log.info(members);
        return chatService.createChatRoom(members);
    }

    @GetMapping("/getChatRoomList")
    public List<ChatRoomDto> getChatRoomList() {
        return chatService.getChatRoomList();
    }

}