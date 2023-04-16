package back.spring.final_back.festival.repository;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FestivalDao {
	public FestivalDto festivalDetail(FestivalDto festivalDto);
	
	
    public List<FestivalDto> festivalListByDate(Date date);

    public List<FestivalDto> festivalList();

    public List<FestivalDto> areaFestivalList(String area);

    int festivalInsert(FestivalDto festival);

    public int festivalDelete(Integer fest_m_id);
}
