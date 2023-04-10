package back.spring.final_back.festival.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FestivalDao {
    public List<FestivalDto> festivalList();
    public List<FestivalDto> seoulFestivalList();
    public List<FestivalDto> kyeongkiFestivalList();
    int festivalInsert(FestivalDto festival);
	public int festivalDelete(Integer fest_m_id);
}

