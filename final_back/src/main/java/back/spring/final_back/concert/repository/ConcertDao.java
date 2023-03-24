package back.spring.final_back.concert.repository;

import back.spring.final_back.concert.service.ConcertServiceImpl;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface ConcertDao {
    List<ConcertDto> ConcertList(String category);
    List<ConcertDto> ConcertToday();
    List<ConcertDto> ConcertSearch(String keyword);
    int ConcertInsert(ConcertDto concertDto);
    int ConcertUpdate(ConcertDto concertDto);
    int ConcertDelete(int concert_no);

}
