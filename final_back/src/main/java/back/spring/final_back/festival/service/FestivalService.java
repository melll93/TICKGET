package back.spring.final_back.festival.service;


import java.util.List;

import back.spring.final_back.festival.repository.FestivalDto;
import back.spring.final_back.festival.repository.FestivalDto2;

public interface FestivalService {

    List<FestivalDto2> festivalList();
    List<FestivalDto2> seoulFestivalList();
    List<FestivalDto2> kyeongkiFestivalList();
    int festivalInsert(FestivalDto festivalDto);

}


