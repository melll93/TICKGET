package back.spring.final_back.festival.service;

import java.util.List;

import back.spring.final_back.board.repository.CarpoolDto;
import back.spring.final_back.board.repository.MarketDto;
import back.spring.final_back.festival.repository.FestivalDto;
import back.spring.final_back.festival.repository.MymymyDto;


public interface SearchService {

  List<FestivalDto> searchFestivalsByKeyword(String keyword);
  
  List<CarpoolDto> searchCarpoolByKeyword(String keyword);

  List<MarketDto> searchMarketByKeyword(String keyword);

  List<MymymyDto> searchForMypage(String memid);


}
