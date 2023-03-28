package back.spring.final_back.ticket.service;

import java.util.List;

import back.spring.final_back.ticket.repository.TicketDto;

public interface TicketService {

   List<TicketDto> getTicketList();
   
}
