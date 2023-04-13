package back.spring.final_back.festival.repository;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FestivalDao {
<<<<<<< HEAD
    public List<FestivalDto> festivalList();
    public List<FestivalDto> areaFestivalList();
    int festivalInsert(FestivalDto festival);
	public int festivalDelete(Integer fest_m_id);
	public FestivalDto festivalDetail(FestivalDto festivalDto);
}
=======
    public List<FestivalDto> festivalListByDate(Date date);
>>>>>>> 8daac155e7484f19dc6d8580eb1ce43d6fd18ae5

    public List<FestivalDto> festivalList();

    public List<FestivalDto> seoulFestivalList();

    public List<FestivalDto> kyeongkiFestivalList();

    int festivalInsert(FestivalDto festival);

    public int festivalDelete(Integer fest_m_id);
}
