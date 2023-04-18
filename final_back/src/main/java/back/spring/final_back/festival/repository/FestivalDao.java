package back.spring.final_back.festival.repository;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FestivalDao {
	public FestivalDto festivalDetail(FestivalDto festivalDto);
	
	
    public List<FestivalDto> festivalListByDate(Date date);

    public List<FestivalDto> festivalList();

    public List<FestivalDto> areaFestivalList(String area);

    int festivalInsert(FestivalDto festival);

    public int festivalDelete(String fest_m_id);

    public List<FestivalDto> festivalHitList();
    
    public void festivalThumpsUp(Map<String, Object> pMap);


	public int festDetailInsert(FestivalDto festivalDto);


	public int festPosterInsert(FestivalDto festivalDto);
}
