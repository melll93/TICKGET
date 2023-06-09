package back.spring.final_back.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.TicketDao;
import back.spring.final_back.board.repository.TicketDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

   private final TicketDao ticketDao;

   @Override
   public List<TicketDto> getTicketList() {
      List<TicketDto> tList = ticketDao.getTicketList();
      return tList;
   }

}
