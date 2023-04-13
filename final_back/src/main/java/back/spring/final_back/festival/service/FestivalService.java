package back.spring.final_back.festival.service;

import java.sql.Date;
import java.util.List;

import back.spring.final_back.festival.repository.FestivalDto;

public interface FestivalService {

<<<<<<< HEAD
    List<FestivalDto> festivalList();
    List<FestivalDto> areaFestivalList();
    int festivalInsert(FestivalDto festivalDto);
	int festivalDelete(Integer fest_m_id);
	FestivalDto festivalDetail(FestivalDto festivalDto);
=======
  List<FestivalDto> festivalListByDate(Date date);

  List<FestivalDto> festivalList();

  List<FestivalDto> seoulFestivalList();

  List<FestivalDto> kyeongkiFestivalList();

  int festivalInsert(FestivalDto festivalDto);

  int festivalDelete(Integer fest_m_id);
>>>>>>> 8daac155e7484f19dc6d8580eb1ce43d6fd18ae5

}
