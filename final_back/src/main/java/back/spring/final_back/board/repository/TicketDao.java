package back.spring.final_back.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TicketDao {

   public List<TicketDto> getTicketList();

}
