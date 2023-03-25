package back.spring.final_back.concert.repository;

import org.apache.ibatis.annotations.Mapper;

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
