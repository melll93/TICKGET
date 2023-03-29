package back.spring.final_back.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.board.repository.TicketDto;
import back.spring.final_back.board.service.TicketService;
import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:3333/")
@Controller
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/api/*")
public class TicketController {

   private final TicketService ticketService; // 로직 주입받는다.

   @GetMapping("ticketList")
   public List<TicketDto> getTicketList() {
      List<TicketDto> tList = ticketService.getTicketList();
      return tList;
   }

}
