package back.spring.final_back.festival.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import back.spring.final_back.board.repository.CarpoolDto;
import back.spring.final_back.board.repository.MarketDto;

@Mapper
public interface SearchDao {

  public List<FestivalDto> searchFestivalsByKeyword(String keyword);

  public List<CarpoolDto> searchCarpoolByKeyword(String keyword);

  public List<FestivalDto> findAll();

  public List<MarketDto> searchMarketByKeyword(String keyword);

  public List<MymymyDto> searchForMypage(String memid);
  public List<MymymyDto> searchForMypage2(String memid);

  public List<MymymyDto> searchForMypage3(String memid);
}
