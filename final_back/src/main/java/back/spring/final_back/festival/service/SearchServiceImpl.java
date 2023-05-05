package back.spring.final_back.festival.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.CarpoolDao;
import back.spring.final_back.board.repository.CarpoolDto;
import back.spring.final_back.board.repository.MarketDao;
import back.spring.final_back.board.repository.MarketDto;
import back.spring.final_back.festival.repository.FestivalDao;
import back.spring.final_back.festival.repository.FestivalDto;
import back.spring.final_back.festival.repository.MymymyDto;
import back.spring.final_back.festival.repository.SearchDao;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

  private final SearchDao searchDao;
  private final FestivalDao festivalDao;
  private final CarpoolDao carpoolDao;
  private final MarketDao marketDao;

  @Override
  public List<FestivalDto> searchFestivalsByKeyword(String keyword) {
      if (keyword != null && !keyword.isEmpty()) {
          keyword = "%" + keyword + "%";
          return searchDao.searchFestivalsByKeyword(keyword);
      } else {
          return festivalDao.festivalList();
      }
  }

  @Override
  public List<CarpoolDto> searchCarpoolByKeyword(String keyword) {
    if (keyword != null && !keyword.isEmpty()) {
      keyword = "%" + keyword + "%";
      return searchDao.searchCarpoolByKeyword(keyword);
  } else {
      return carpoolDao.selectCarpool();
  }
}

  @Override
  public List<MarketDto> searchMarketByKeyword(String keyword) {
    if (keyword != null && !keyword.isEmpty()) {
      keyword = "%" + keyword + "%";
      return searchDao.searchMarketByKeyword(keyword);
  } else {
      return marketDao.mk_boardList(null);
  }
}

  @Override
  public List<MymymyDto> searchForMypage(String memid) {
    List<MymymyDto> mList=searchDao.searchForMypage(memid);
    List<MymymyDto> mList2=searchDao.searchForMypage2(memid);
        List<MymymyDto> mergedMList = new ArrayList<>();
        mergedMList.addAll(mList);
        mergedMList.addAll(mList2);
        return mergedMList;
		    }
}
