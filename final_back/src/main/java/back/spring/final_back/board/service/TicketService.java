package back.spring.final_back.board.service;

import java.util.List;

import back.spring.final_back.board.repository.TicketDto;

public interface TicketService {

   List<TicketDto> getTicketList();
   
}
