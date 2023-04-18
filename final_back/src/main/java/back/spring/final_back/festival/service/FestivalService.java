package back.spring.final_back.festival.service;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import back.spring.final_back.festival.repository.FestivalDto;

public interface FestivalService {


  List<FestivalDto> festivalListByDate(Date date);

  List<FestivalDto> festivalList();

  List<FestivalDto> areaFestivalList(String area);

  int festivalInsert(FestivalDto festivalDto);

  int festivalDelete(String fest_m_id);

FestivalDto festivalDetail(FestivalDto festivalDto);

List<FestivalDto> festivalHitList();

void festivalThumpsUp(Map<String, Object> pMap);

int festDetailInsert(FestivalDto festivalDto);

int festPosterInsert(FestivalDto festivalDto);

int festTicketInsert(FestivalDto festivalDto);


}
