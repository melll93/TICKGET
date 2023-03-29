package back.spring.final_back.festival.service;

import back.spring.final_back.festival.repository.ConcertDto;

import java.util.List;

public interface ConcertService {
    List<ConcertDto> ConcertList(String category);

    List<ConcertDto> ConcertToday();

    List<ConcertDto> ConcertSearch(String keyword);

    int ConcertInsert(ConcertDto concertDto);

    int ConcertUpdate(ConcertDto concertDto);

    int ConcertDelete(int concert_no);


}
