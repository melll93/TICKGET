package back.spring.final_back.festival.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FestivalDao {
    public List<FestivalDto2> festivalList();
    public List<FestivalDto2> seoulFestivalList();
    public List<FestivalDto2> kyeongkiFestivalList();
    int festivalInsert(FestivalDto festival);
}

