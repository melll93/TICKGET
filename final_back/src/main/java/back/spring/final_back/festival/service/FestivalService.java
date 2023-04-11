package back.spring.final_back.festival.service;


import java.util.List;

import back.spring.final_back.festival.repository.FestivalDto;

public interface FestivalService {

    List<FestivalDto> festivalList();
    List<FestivalDto> seoulFestivalList();
    List<FestivalDto> kyeongkiFestivalList();
    int festivalInsert(FestivalDto festivalDto);
	int festivalDelete(Integer fest_m_id);

}


