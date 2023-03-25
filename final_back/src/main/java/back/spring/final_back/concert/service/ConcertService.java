package back.spring.final_back.concert.service;

import back.spring.final_back.concert.repository.ConcertDto;

import java.util.List;

public interface ConcertService {
    List<ConcertDto> ConcertList(String category);

    List<ConcertDto> ConcertToday();

    List<ConcertDto> ConcertSearch(String keyword);

    int ConcertInsert(ConcertDto concertDto);

    int ConcertUpdate(ConcertDto concertDto);

    int ConcertDelete(int concert_no);


}
