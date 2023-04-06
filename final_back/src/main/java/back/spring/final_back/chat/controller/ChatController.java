package back.spring.final_back.chat.controller;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
@Log4j2
public class ChatController {

    @GetMapping("/chat")
    public String chatGET(){

        log.info("@@@@@@@@@@@ChatController, chat GET()");
        return "chat";
    }
}